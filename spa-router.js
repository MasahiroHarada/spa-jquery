'use strict';

var spaRouter = {};

spaRouter.route = {
  '': 'landingView',
  '#': 'landingView',
  '#about': 'aboutView',
  '#contact': 'contactView'
};

spaRouter.template = function(viewName) {
  return $('#templates').find('#' + viewName).clone();
};

spaRouter.landingView = function() {
  return spaRouter.template('landing');
};

spaRouter.aboutView = function() {
  return spaRouter.template('about');
};

spaRouter.contactView = function(hashParams) {
  var view = spaRouter.template('contact');
  view.find('.param').text(hashParams[1]);
  return view;
};

spaRouter.render = function(hash) {
  var hashParams = hash.split('/');
  var viewFunctionName = spaRouter.route[hashParams[0]];
  if (!viewFunctionName) {
    return false;
  }
  var viewFunction = spaRouter[viewFunctionName];
  if (viewFunction) {
    $('.view-container').empty().append(viewFunction(hashParams));
  }
};

spaRouter.init = function() {
  window.onhashchange = function() {
    spaRouter.render(window.location.hash);
  };
  spaRouter.render(window.location.hash);
};
