module.exports = function(grunt){
  grunt.registerMultiTask(
    'searchAndDownload',
    'searches file(s) for a given pattern.  Downloads those files, and modifies the search file with a new link',
    function(){
      var gruntDone = this.async(); //grunt ansync task
      
      var properties = this.options();
      
      var http = require('http'),
          https = require('https')
          Q = require('q'),
          fs = require('fs');
          
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';  
      
      var paths = grunt.file.expand([properties.directory+properties.files]);
      
      var hash = {}; //hash object for use later on
      var allLinks = []; //all the links
      
      for (var i=0;i<paths.length;i++)
      {
        var path = paths[i]; //get the path
        var fileStr = grunt.file.read(path); //read the file
        var links = fileStr.match(properties.pattern) || [];
        
        //set the hash up
        hash[path] = {
          fileStr:fileStr,
          links:links
        };
        
        allLinks.concat(links);
      }
      
      grunt.verbose.writeln('Link count: '+(allLinks || []).length)
      if (!allLinks){
        return null;
      }
      grunt.verbose.writeln(allLinks);
      
      var linksHash = {}; //which urls have been downloaded
      var linkCalls = [];
      
      for (var path in hash) //for each file
      {
        var obj = hash[path]; //get the obj
        
        var links = obj.links; //get the links
        
        for (var j=0;j<links.length;j++) //for each link
        {
          var link = links[j]; //get the links
          
          linkCalls.push(function(link,obj,path,index){
            var deferred = Q.defer();
            
            //Success!
            grunt.verbose.write('Link found: ');
            grunt.verbose.writeln(link);
            
            (function(link,obj,path,index){
              var newFile = properties.newFile(properties,link,path,index);
              
              //replace the remote URL with the local version
              obj.fileStr = obj.fileStr.replace(link,newFile.replaceUrl); //ALWAYS do this
              
              if (!linksHash[newFile.fileName]) //if we haven't seen to download yet
              {
                linksHash[newFile.fileName] = true;
                
                var request = link.indexOf('https://') > -1 ? https : http;
                
                request.get(link, function(res){
                  grunt.verbose.writeln("Success get "+link);

                  //save file
                  var filepath = properties.directory + newFile.path + newFile.fileName;
                  var file = fs.createWriteStream(filepath);
                  res.pipe(file);
                  file.on('finish', function(){
                    grunt.verbose.write('Saved file: ');
                    grunt.verbose.writeln(filepath);                    
                    deferred.resolve(link);
                  });
                }).on('response', function(err){
                  if(err.statusCode === 404)
                  {
                    grunt.log.error("Error downloading "+link);
                    deferred.reject(new Error(err.message));
                  }
                });
              }
              else
              {
                deferred.resolve(link);
              }
            })(link,obj,path,index);
            
            return deferred.promise;
          }(link,obj,path,j));
        }
      }

      Q.all(linkCalls).done(function(){
        grunt.verbose.writeln('Saving Files modified Main file');
        
        for (var i in hash)
        {
          grunt.file.write(i, hash[i].fileStr);
        }
        
        gruntDone();
      });
    }
  );
};