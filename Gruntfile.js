module.exports = function(grunt) {
  grunt.initConfig({
    harp:{
      dist:{
        source:'_copy_',
        dest:'www'
      }
    },
    copy:{
      main:{
        files:[
          {
            expand:true,
            cwd:'_harp/',
            src:'**',
            dest:'_copy_/'
          }
        ]
      }
    },
    clean:{
      www:'www',
      main:'_copy_'
    },
    searchAndDownload:{
      saveLanguageFiles:{
        options:{
          directory:'_copy_/js/', //main js directory
          files:"*.js", //get main js file
          pattern:/https:\/\/ned-production\.herokuapp\.com\/api\/project\/[^\"]+(?=\")/ig, //ned regex
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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-harp');
  grunt.loadTasks('ned-grunt/');

  grunt.registerTask('default',[
    'clean:www',
    'copy:main',
    'searchAndDownload:saveLanguageFiles',
    'harp',
    'clean:main'
  ]);
};
