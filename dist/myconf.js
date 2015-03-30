System.register([], function (_export) {
  _export("configure", configure);

  //myconf.js

  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging();

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }

  return {
    setters: [],
    execute: function () {
      "use strict";
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15Y29uZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3VCQUNnQixTQUFTOzs7O0FBQWxCLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTtBQUNqQyxXQUFPLENBQUMsR0FBRyxDQUNSLHFCQUFxQixFQUFFLENBQ3ZCLGtCQUFrQixFQUFFLENBQUM7O0FBRXhCLFdBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtLQUFBLENBQUMsQ0FBQztHQUN4QyIsImZpbGUiOiJteWNvbmYuanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==