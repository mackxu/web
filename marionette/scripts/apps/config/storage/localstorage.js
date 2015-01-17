App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
  
  var findStorageKey = function(entity) {
    // use a model urlRoot value
    // both urlRoot and url can be defined as function
    // _.result() function to return value or function result
    if(entity.urlRoot) {
      return _.result(entity, 'urlRoot');
    }

    // use a collection url value
    if(entity.url) {
      return _.result(entity, 'url');
    }

    // fallback to obtaining a model's storage key from the collection it belongs to
    if(entity.collection && entity.collection.url) {
      return _.result(entity.collection, 'url');
    }

    throw new Error('Error: Unable to determine storage key.'); 
  };

  var StorageMixin = function(entity) {
    var storageKey = findStorageKey(entity.prototype);
    return { localStorage: new Backbone.LocalStorage(storageKey) };
  };

  Entities.Storage = function(entity) {
    // 为entity添加localStorage属性
    _.extend(entity.prototype, new StorageMixin(entity));
  };

});
