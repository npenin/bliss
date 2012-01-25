if module isnt undefined
  fs = require 'fs'
  path = require 'path'
  Writer = require './writer'
  Tokenizer = require './tokenizer'


class Bliss

  tokenizer = new Tokenizer()

  constructor: (@options) ->
    @cache = {}
    @options = defaults @options, {
      ext: '.js.html'
      cacheEnabled: true
    }

  defaults = (objects...) ->
    result = {}
    for object in objects
      if object?
        for k,v of object
          result[k] ?= v
    result
  
  compile: (source,options) ->
    self = @
    options = defaults options, @options, {
      context: {}
    }
    context = options.context

    context.render = (filename,args...) ->
      dirname = path.dirname options.filename
      filepath = path.resolve dirname, filename
      self.render filepath, args...

    writer = new Writer()
    writer.write tokenizer.tokenize source
    
    tmplParams = writer.parameters
    tmplSource = writer.source(context)

    console.log "~~~~~~~~~~"
    console.log tmplSource
    console.log "~~~~~~~~~~"

    try
      func = Function tmplParams..., tmplSource
      tmpl = func.bind(context)
      tmpl.filename = options.filename
      tmpl.toString = func.toString.bind(func)
      tmpl.toSource = () -> source
    catch error
      error.templateSource = tmplSource
      throw error

    return tmpl


  compileFile: (filename,options) ->
    self = @
    options = defaults options, @options, {
      filename: filename,
      ext: if (p=filename.indexOf('.')) >= 0 then filename[p..] else ''
    }

    filepath = filename
    stat = undefined
    try
      stat = fs.statSync filepath
    catch thrown
      try
        filepath = filepath + options.ext
        stat = fs.statSync filepath
      catch thrown
        throw thrown
    
    _compileFile = ->
      source = fs.readFileSync filepath, 'utf8'
      template = self.compile source, options
    
    if options.cacheEnabled 
      if @cache[filepath]?
        entry = @cache[filepath]
        if stat.mtime > entry.mtime
          entry.filename = filepath
          entry.mtime = Date.now()
          entry.template = _compileFile()
          @cache[filepath] = entry
          entry.template
        else
          entry.template
      else
        entry = {}
        entry.filename = filepath
        entry.mtime = Date.now()
        entry.template = _compileFile()
        @cache[filepath] = entry
        entry.template
    else
      _compileFile()
  

  render: (filename,args...) ->
    template = @compileFile filename
    template args...

if module isnt undefined
  module.exports = Bliss