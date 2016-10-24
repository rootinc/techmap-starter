module.exports = function(grunt) {
  grunt.initConfig({
    harp:{
      dist:{
        source:'_harp',
        dest:'www'
      }
    },
    searchAndDownload:{
      saveLanguageFiles:{
        options:{
          directory:'_harp/js/', //main js directory
          files:"*.js", //get main js file
          pattern:/https:\/\/ned\.rootinc\.tools\/api\/project\/[^\"]+(?=\")/ig, //ned regex
          newFile:function(properties,link,path,index){
            var fileName = 'lang'+index+'.json';

            return {
              fileName:fileName,
              path:'',
              replaceUrl:"js/"+fileName
            };
          }
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-harp');
  grunt.loadTasks('ned-grunt/');
  
  grunt.registerTask('default',[
    'searchAndDownload:saveLanguageFiles',
    'harp'
  ]);
};