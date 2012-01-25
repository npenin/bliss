(function() {
  var Access, Anchor, Bliss, Block, Content, DoWhile, Else, Failure, For, Func, Group, If, Invoke, Member, NoMatch, Parameters, ScriptBlock, Success, Tag, Tokenizer, Validation, Value, While, Writer, failure, fs, module, path, success, _ref, _ref2,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = Array.prototype.slice;

  module = void 0;

  Validation = (function() {

    function Validation() {}

    Validation.success = false;

    Validation.failure = false;

    Validation.prototype.get = function() {
      return;
    };

    return Validation;

  })();

  Success = (function(_super) {

    __extends(Success, _super);

    function Success(offset, value) {
      this.offset = offset;
      this.value = value;
      this.success = true;
    }

    Success.prototype.get = function() {
      return this.value;
    };

    Success.prototype.toString = function() {
      return toString('Success[', this.offset, '] := ', this.value);
    };

    return Success;

  })(Validation);

  success = function(offset, value) {
    return new Success(offset, value);
  };

  Failure = (function(_super) {

    __extends(Failure, _super);

    function Failure(offset, error, cause) {
      this.offset = offset;
      this.error = error;
      this.cause = cause;
      this.failure = true;
    }

    Failure.prototype.toString = function() {
      return toString('Failure[', this.offset, '] := ', this.error);
    };

    return Failure;

  })(Validation);

  failure = function(offset, error) {
    return new Failure(offset, error);
  };

  NoMatch = void 0;

  if (module !== void 0) {
    module.exports = {
      Success: Success,
      success: success,
      Failure: Failure,
      failure: failure,
      NoMatch: NoMatch
    };
  }

  Tag = (function() {

    function Tag() {}

    Tag.prototype.tag = true;

    Tag.prototype.name = void 0;

    Tag.prototype.parts = function() {
      return [];
    };

    return Tag;

  })();

  Anchor = (function(_super) {

    __extends(Anchor, _super);

    Anchor.prototype.name = 'Anchor';

    function Anchor(content) {
      this.content = content;
    }

    Anchor.prototype.parts = function() {
      return ['@', this.content];
    };

    return Anchor;

  })(Tag);

  Content = (function(_super) {

    __extends(Content, _super);

    Content.prototype.name = 'Content';

    function Content(content) {
      this.content = content;
    }

    Content.prototype.parts = function() {
      return [this.content];
    };

    return Content;

  })(Tag);

  Group = (function(_super) {

    __extends(Group, _super);

    Group.prototype.name = 'Group';

    function Group(content) {
      this.content = content;
    }

    Group.prototype.parts = function() {
      return ['(', this.content, ')'];
    };

    return Group;

  })(Tag);

  Block = (function(_super) {

    __extends(Block, _super);

    Block.prototype.name = 'Block';

    function Block(content) {
      this.content = content;
    }

    Block.prototype.parts = function() {
      return ['{', this.content, '}'];
    };

    return Block;

  })(Tag);

  ScriptBlock = (function(_super) {

    __extends(ScriptBlock, _super);

    ScriptBlock.prototype.name = 'ScriptBlock';

    function ScriptBlock(content) {
      this.content = content;
    }

    ScriptBlock.prototype.parts = function() {
      return ['{', this.content, '}'];
    };

    return ScriptBlock;

  })(Tag);

  If = (function(_super) {

    __extends(If, _super);

    If.prototype.name = 'If';

    function If(test, block, _else) {
      this.test = test;
      this.block = block;
      this["else"] = _else;
    }

    If.prototype.parts = function() {
      return ['if', this.test, this.block, this["else"]];
    };

    return If;

  })(Tag);

  Else = (function(_super) {

    __extends(Else, _super);

    Else.prototype.name = 'Else';

    function Else(content) {
      this.content = content;
    }

    Else.prototype.parts = function() {
      return ['else ', this.content];
    };

    return Else;

  })(Tag);

  For = (function(_super) {

    __extends(For, _super);

    For.prototype.name = 'For';

    function For(test, block) {
      this.test = test;
      this.block = block;
    }

    For.prototype.parts = function() {
      return ['for', this.test, this.block];
    };

    return For;

  })(Tag);

  While = (function(_super) {

    __extends(While, _super);

    While.prototype.name = 'While';

    function While(test, block) {
      this.test = test;
      this.block = block;
    }

    While.prototype.parts = function() {
      return ['while', this.test, this.block];
    };

    return While;

  })(Tag);

  DoWhile = (function(_super) {

    __extends(DoWhile, _super);

    DoWhile.prototype.name = 'DoWhile';

    function DoWhile(block, test) {
      this.block = block;
      this.test = test;
    }

    DoWhile.prototype.parts = function() {
      return ['do', this.block, 'while', this.test, ';'];
    };

    return DoWhile;

  })(Tag);

  Func = (function(_super) {

    __extends(Func, _super);

    Func.prototype.name = 'Func';

    function Func(identifier, args, block) {
      this.identifier = identifier;
      this.args = args;
      this.block = block;
    }

    Func.prototype.parts = function() {
      return ['function ', this.identifier, this.args, this.block];
    };

    return Func;

  })(Tag);

  Parameters = (function(_super) {

    __extends(Parameters, _super);

    Parameters.prototype.name = 'Parameters';

    function Parameters(parameters) {
      this.parameters = parameters;
    }

    Parameters.prototype.parts = function() {
      return [this.parameters];
    };

    return Parameters;

  })(Tag);

  Value = (function(_super) {

    __extends(Value, _super);

    Value.prototype.name = 'Value';

    function Value(identifier, next) {
      this.identifier = identifier;
      this.next = next;
    }

    Value.prototype.parts = function() {
      return [this.identifier, this.next];
    };

    return Value;

  })(Tag);

  Member = (function(_super) {

    __extends(Member, _super);

    Member.prototype.name = 'Member';

    function Member(value) {
      this.value = value;
    }

    Member.prototype.parts = function() {
      return [this.value];
    };

    return Member;

  })(Tag);

  Access = (function(_super) {

    __extends(Access, _super);

    Access.prototype.name = 'Access';

    function Access(content) {
      this.content = content;
    }

    Access.prototype.parts = function() {
      return ['[', this.content, ']'];
    };

    return Access;

  })(Tag);

  Invoke = (function(_super) {

    __extends(Invoke, _super);

    Invoke.prototype.name = 'Invoke';

    function Invoke(content) {
      this.content = content;
    }

    Invoke.prototype.parts = function() {
      return ['(', this.content, ')'];
    };

    return Invoke;

  })(Tag);

  if (module !== void 0) {
    module.exports = {
      Tag: Tag,
      Anchor: Anchor,
      Content: Content,
      Group: Group,
      Block: Block,
      ScriptBlock: ScriptBlock,
      If: If,
      Else: Else,
      For: For,
      While: While,
      DoWhile: DoWhile,
      Func: Func,
      Parameters: Parameters,
      Value: Value,
      Member: Member,
      Access: Access,
      Invoke: Invoke
    };
  }

  if (module !== void 0) {
    _ref = require('./tags'), Anchor = _ref.Anchor, Content = _ref.Content, Group = _ref.Group, Block = _ref.Block, ScriptBlock = _ref.ScriptBlock, If = _ref.If, Else = _ref.Else, For = _ref.For, While = _ref.While, DoWhile = _ref.DoWhile, Func = _ref.Func, Parameters = _ref.Parameters, Value = _ref.Value, Member = _ref.Member, Access = _ref.Access, Invoke = _ref.Invoke;
    _ref2 = require('./validation'), Success = _ref2.Success, success = _ref2.success, Failure = _ref2.Failure, failure = _ref2.failure, NoMatch = _ref2.NoMatch;
  }

  Tokenizer = (function() {
    var ACCESS, ANCHOR, BLOCK, COMMENT, DO, DO_WHILE, ELSE, FOR, FUNC, GROUP, IDENTIFIER, IF, INVOKE, MEMBER, PARAMETERS, TRAILING_SPACES, WHILE, WHITESPACE;

    function Tokenizer() {}

    WHITESPACE = /^[^\n\S]+/;

    TRAILING_SPACES = /\s+$/;

    ANCHOR = /^@/;

    PARAMETERS = /^!\(/;

    IF = /^if\s*\(/;

    ELSE = /^\s*else\s*/;

    FOR = /^for\s*\(/;

    WHILE = /^while\s*\(/;

    DO = /^do\s*\{/;

    DO_WHILE = /^\s*while\s*\(/;

    FUNC = /^function(?:\s+([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*))?\s*\(/;

    GROUP = /^\s*\(/;

    BLOCK = /^\s*\{/;

    IDENTIFIER = /^[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*/;

    MEMBER = /^\s*\./;

    ACCESS = /^\s*\[/;

    INVOKE = /^\s*\(/;

    COMMENT = /^\*/;

    Tokenizer.prototype.tokenize = function(source, options) {
      if (WHITESPACE.test(source)) source = "\n" + source;
      source = source.replace(/\r/g, '').replace(TRAILING_SPACES, '');
      return this.replace(source, '@', this.Anchor.bind(this));
    };

    Tokenizer.prototype.replace = function(source, token, callback) {
      var index, offset, result, results;
      results = [];
      while ((index = source.indexOf(token)) >= 0) {
        if (index > 0) results.push(source.slice(0, (index - 1) + 1 || 9e9));
        source = source.slice(index);
        result = callback(source);
        if (result != null) {
          if (result.success) {
            offset = result.offset;
            source = source.slice(offset);
            results.push(result.get());
          } else {
            throw result;
          }
        }
      }
      if (source.length > 0) results.push(source);
      return results;
    };

    Tokenizer.prototype.pair = function(str, left, right) {
      var c, i, pairs, start, _len;
      pairs = 0;
      start = 0;
      for (i = 0, _len = str.length; i < _len; i++) {
        c = str[i];
        switch (c) {
          case left:
            pairs++;
            break;
          case right:
            pairs--;
            if (pairs === 0) return i + 1;
        }
      }
      return 0;
    };

    Tokenizer.prototype.Anchor = function(chunk) {
      var offset, result, start, value;
      if (chunk[0] !== '@') return NoMatch;
      start = 1;
      chunk = chunk.slice(start);
      result = this.Comment(chunk) || this.Parameters(chunk) || this.Escape(chunk) || this.If(chunk) || this.For(chunk) || this.While(chunk) || this.DoWhile(chunk) || this.Func(chunk) || this.Group(chunk) || this.ScriptBlock(chunk) || this.Value(chunk);
      if (result != null ? result.success : void 0) {
        offset = start + result.offset;
        value = new Anchor(result.get());
        return success(offset, value);
      } else {
        return success(1, new Content('@'));
      }
      return result;
    };

    Tokenizer.prototype.Comment = function(chunk) {
      var error, match, offset, start, value;
      if (!(match = COMMENT.exec(chunk))) return NoMatch;
      start = match[0].length;
      match = chunk.slice(start).match(/\*\@\s*/);
      if (!(match != null)) {
        offset = start;
        error = 'malformed comment';
        return failure(offset, error);
      }
      offset = start + match.index + match[0].length;
      value = new Content('');
      return success(offset, value);
    };

    Tokenizer.prototype.Parameters = function(chunk) {
      var end, error, match, offset, parameters, start, value;
      if (!(match = PARAMETERS.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '(', ')');
      if (end) {
        parameters = chunk.slice(1, (end - 1)).split(',').map(function(p) {
          return p.trim();
        });
        offset = start + end;
        value = new Parameters(parameters);
        return success(offset, value);
      } else {
        offset = start;
        error = 'malformed parameters';
        return failure(offset, error);
      }
    };

    Tokenizer.prototype.Escape = function(chunk) {
      var match;
      if (!(match = ANCHOR.exec(chunk))) return NoMatch;
      return success(1, new Content('@'));
    };

    Tokenizer.prototype.Group = function(chunk) {
      var end, error, match, offset, start, value;
      if (!(match = GROUP.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '(', ')');
      if (!end) {
        offset = start;
        error = 'malformed group';
        return failure(offset, error);
      }
      offset = start + end;
      value = new Group(chunk.slice(1, (end - 1)));
      return success(offset, value);
    };

    Tokenizer.prototype.Block = function(chunk) {
      var content, end, error, match, offset, result, results, start, value, _i, _len;
      if (!(match = BLOCK.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '{', '}');
      if (!end) {
        offset = start;
        error = 'malformed block';
        return failure(offset, error);
      }
      chunk = chunk.slice(1, (end - 1));
      results = this.tokenize(chunk);
      content = [];
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (!result || result.failure) {
          return result;
        } else if (result.value != null) {
          content.push(result.value);
        } else {
          content.push(result);
        }
      }
      offset = start + end;
      value = new Block(content);
      return success(offset, value);
    };

    Tokenizer.prototype.ScriptBlock = function(chunk) {
      var end, error, match, offset, start, value;
      if (!(match = BLOCK.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '{', '}');
      if (!end) {
        offset = start;
        error = 'malformed block';
        return failure(offset, error);
      }
      offset = start + end;
      value = new ScriptBlock(chunk.slice(1, (end - 1)));
      return success(offset, value);
    };

    Tokenizer.prototype.Else = function(chunk) {
      var block, error, match, offset, start, stmt, value;
      if (!(match = ELSE.exec(chunk))) return NoMatch;
      start = match[0].length;
      chunk = chunk.slice(start);
      block = this.Block(chunk);
      if (!block) {
        stmt = this.If(chunk);
        if (!stmt) {
          offset = start;
          error = 'malformed else statement';
          return failure(offset, error);
        } else if (stmt.error) {
          return stmt.error;
        } else {
          offset = start + stmt.offset;
          value = new Else(stmt.get());
          return success(offset, value);
        }
      } else {
        offset = start + block.offset;
        value = new Else(block.get());
        return success(offset, value);
      }
    };

    Tokenizer.prototype.If = function(chunk) {
      var block, error, ifElse, match, offset, start, test, value;
      if (!(match = IF.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      test = this.Group(chunk);
      if (!test || test.error) {
        offset = start;
        error = 'malformed if condition';
        return failure(offset, error, test);
      }
      chunk = chunk.slice(test.offset);
      block = this.Block(chunk);
      if (!block || block.error) {
        offset = start + test.offset;
        error = 'malformed if block';
        return failure(offset, error, block);
      }
      chunk = chunk.slice(block.offset);
      ifElse = this.Else(chunk);
      if (!ifElse) {
        offset = start + test.offset + block.offset;
        value = new If(test.get(), block.get());
        return success(offset, value);
      }
      if (ifElse.error) {
        offset = start + test.offset + block.offset + ifElse.offset;
        error = ifElse.error;
        return failure(offset, error, ifElse);
      }
      offset = start + test.offset + block.offset + ifElse.offset;
      value = new If(test.get(), block.get(), ifElse.get());
      return success(offset, value);
    };

    Tokenizer.prototype.For = function(chunk) {
      var block, error, match, offset, start, test, value;
      if (!(match = FOR.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      test = this.Group(chunk);
      if (!test || test.error) {
        offset = start;
        error = 'malformed for condition';
        return failure(offset, error, test);
      }
      chunk = chunk.slice(test.offset);
      block = this.Block(chunk);
      if (!block || block.error) {
        offset = start + test.offset;
        error = 'malformed while block';
        return failure(offset, error, block);
      }
      offset = start + test.offset + block.offset;
      value = new For(test.get(), block.get());
      return success(offset, value);
    };

    Tokenizer.prototype.While = function(chunk) {
      var block, error, match, offset, start, test, value;
      if (!(match = WHILE.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      test = this.Group(chunk);
      if (!test || test.error) {
        offset = start;
        error = 'malformed while condition';
        return failure(offset, error, test);
      }
      chunk = chunk.slice(test.offset);
      block = this.Block(chunk);
      if (!block || block.error) {
        offset = start + test.offset;
        error = 'malformed while block';
        return failure(offset, error, block);
      }
      offset = start + test.offset + block.offset;
      value = new While(test.get(), block.get());
      return success(offset, value);
    };

    Tokenizer.prototype.DoWhile = function(chunk) {
      var block, error, match, offset, start, test, value, whileMatch, whileStart;
      if (!(match = DO.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      block = this.Block(chunk);
      if (!block || block.error) {
        offset = start;
        error = 'malformed do block';
        return failure(offset, error, block);
      }
      chunk = chunk.slice(block.offset);
      test = (whileMatch = DO_WHILE.exec(chunk)) ? (whileStart = whileMatch[0].length - 1, chunk = chunk.slice(whileStart), this.Group(chunk)) : NoMatch;
      if (!test || test.error) {
        offset = start + block.offset;
        error = 'malformed do while condition';
        return failure(offset, error, test);
      }
      offset = start + block.offset + whileStart + test.offset;
      value = new DoWhile(block.get(), test.get());
      return success(offset, value);
    };

    Tokenizer.prototype.Func = function(chunk) {
      var args, block, error, match, name, offset, start, value;
      if (!(match = FUNC.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      name = match[1];
      chunk = chunk.slice(start);
      args = this.Group(chunk);
      if (!args || args.error) {
        offset = start;
        error = 'malformed function arguments';
        return failure(offset, error, args);
      }
      chunk = chunk.slice(args.offset);
      block = this.Block(chunk);
      if (!block || block.error) {
        offset = start + args.offset;
        error = 'malformed function block';
        return failure(offset, error, block);
      }
      offset = start + args.offset + block.offset;
      value = new Func(name, args.get(), block.get());
      return success(offset, value);
    };

    Tokenizer.prototype.Value = function(chunk) {
      var error, match, offset, result, start, value;
      if (!(match = IDENTIFIER.exec(chunk))) return NoMatch;
      start = match[0].length;
      chunk = chunk.slice(start);
      result = this.Member(chunk) || this.Access(chunk) || this.Invoke(chunk);
      if (!result) {
        offset = start;
        value = new Value(match[0]);
        return success(offset, value);
      } else if (result.failure) {
        offset = start;
        error = 'malformed value';
        return failure(offset, error, result);
      } else {
        offset = start + result.offset;
        value = new Value(match[0], result.get());
        return success(offset, value);
      }
    };

    Tokenizer.prototype.Member = function(chunk) {
      var error, match, offset, result, start, value;
      if (!(match = MEMBER.exec(chunk))) return NoMatch;
      start = match[0].length;
      chunk = chunk.slice(start);
      result = this.Value(chunk);
      if (!result || result.failure) {
        offset = start;
        error = 'malformed member access';
        return failure(offset, error, result);
      }
      offset = start + result.offset;
      value = new Member(result.get());
      return success(offset, value);
    };

    Tokenizer.prototype.Access = function(chunk) {
      var end, error, match, offset, results, start, value;
      if (!(match = ACCESS.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '[', ']');
      if (!end) {
        offset = start;
        error = 'malformed array access';
        return failure(offset, error);
      }
      results = this.replace(chunk.slice(start + 1, (end - 1)), 'function', this.Func.bind(this));
      offset = start + end;
      value = new Access(results);
      return success(offset, value);
    };

    Tokenizer.prototype.Invoke = function(chunk) {
      var end, error, match, offset, results, start, value;
      if (!(match = INVOKE.exec(chunk))) return NoMatch;
      start = match[0].length - 1;
      chunk = chunk.slice(start);
      end = this.pair(chunk, '(', ')');
      if (!end) {
        offset = start;
        error = 'malformed group';
        return failure(offset, error);
      }
      results = this.replace(chunk.slice(start + 1, (end - 1)), 'function', this.Func.bind(this));
      offset = start + end;
      value = new Invoke(results);
      return success(offset, value);
    };

    return Tokenizer;

  })();

  if (module !== void 0) module.exports = Tokenizer;

  Writer = (function() {

    function Writer() {
      this.buffer = [];
      this.parameters = [];
    }

    Writer.prototype.code = function(code) {
      return this.buffer.push(code);
    };

    Writer.prototype.text = function(text) {
      text = text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"').replace(/'/g, "\\'");
      this.buffer.push('write("');
      this.buffer.push(text);
      return this.buffer.push('");\n');
    };

    Writer.prototype.write = function(elements) {
      var element, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        if (element != null) {
          if (element.tag != null) {
            _results.push(this.tag(element));
          } else {
            _results.push(this.text(element));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Writer.prototype.tag = function(tag) {
      var c, index, _i, _len, _ref3;
      switch (tag.name) {
        case 'Anchor':
          return this.tag(tag.content);
        case 'Content':
          return this.text(tag.content);
        case 'Block':
          this.code('{');
          if ((tag.content != null) && Array.isArray(tag.content)) {
            _ref3 = tag.content;
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              c = _ref3[_i];
              if ((c != null ? c.tag : void 0) != null) {
                this.tag(c);
              } else if (c != null) {
                this.text(c);
              }
            }
          }
          return this.code('}');
        case 'Group':
          this.code('__tmp=');
          this.code('(');
          if (tag.content != null) this.code(tag.content);
          this.code(');');
          this.code('if(__tmp !== undefined || __tmp !== null){');
          this.code('Array.isArray(__tmp) ? write(__tmp.join("")) : write(__tmp);');
          return this.code('}');
        case 'Value':
          index = this.values;
          this.code('__tmp=');
          this.value(tag);
          this.code(';');
          this.code('if(__tmp !== undefined || __tmp !== null){');
          this.code('Array.isArray(__tmp) ? write(__tmp.join("")) : write(__tmp);');
          return this.code('}');
        case 'Parameters':
          return this.parameters = tag.parameters;
        case 'Func':
          this.code('function');
          this.tag(tag.args);
          this.code('{');
          this.code('var __out=[],write=__out.push.bind(__out),__tmp=0;');
          this.tag(tag.block);
          this.code('return __out.join(\'\');');
          return this.code('}');
        default:
          if (tag.parts != null) return this.parts(tag.parts());
      }
    };

    Writer.prototype.parts = function(parts) {
      var part, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        if (part != null) {
          if (part.tag != null) {
            _results.push(this.tag(part));
          } else {
            _results.push(this.code(part));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Writer.prototype.value = function(value) {
      var tag;
      this.code(value.identifier);
      if (value.next != null) {
        tag = value.next;
        switch (tag.name) {
          case 'Access':
            return this.group(tag, '[', ']');
          case 'Invoke':
            return this.group(tag, '(', ')');
          case 'Member':
            this.code('.');
            return this.value(tag.value);
        }
      }
    };

    Writer.prototype.group = function(tag, open, close) {
      var c, _i, _len, _ref3;
      if (open != null) this.code(open);
      if ((tag.content != null) && Array.isArray(tag.content)) {
        _ref3 = tag.content;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          if ((c != null ? c.tag : void 0) != null) {
            this.tag(c);
          } else if (c != null) {
            this.code(c);
          }
        }
      }
      if (close != null) return this.code(close);
    };

    Writer.prototype.source = function(context) {
      var ctx, k, v;
      if (context == null) context = {};
      ctx = [];
      for (k in context) {
        v = context[k];
        ctx.push(',');
        ctx.push(k);
        ctx.push('=this.');
        ctx.push(k);
      }
      return ['var __out=[],write=__out.push.bind(__out),__tmp=0', ctx.join(''), ';', this.buffer.join(''), 'return __out.join(\'\');'].join('');
    };

    return Writer;

  })();

  if (module !== void 0) module.exports = Writer;

  if (module !== void 0) {
    fs = require('fs');
    path = require('path');
    Writer = require('./writer');
    Tokenizer = require('./tokenizer');
  }

  Bliss = (function() {
    var defaults, tokenizer;

    tokenizer = new Tokenizer();

    function Bliss(options) {
      this.options = options;
      this.cache = {};
      this.options = defaults(this.options, {
        ext: '.js.html',
        cacheEnabled: true
      });
    }

    defaults = function() {
      var k, object, objects, result, v, _i, _len;
      objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      result = {};
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        if (object != null) {
          for (k in object) {
            v = object[k];
            if (result[k] == null) result[k] = v;
          }
        }
      }
      return result;
    };

    Bliss.prototype.compile = function(source, options) {
      var context, func, self, tmpl, tmplParams, tmplSource, writer;
      self = this;
      options = defaults(options, this.options, {
        context: {}
      });
      context = options.context;
      context.render = function() {
        var args, dirname, filename, filepath;
        filename = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        dirname = path.dirname(options.filename);
        filepath = path.resolve(dirname, filename);
        return self.render.apply(self, [filepath].concat(__slice.call(args)));
      };
      writer = new Writer();
      writer.write(tokenizer.tokenize(source));
      tmplParams = writer.parameters;
      tmplSource = writer.source(context);
      try {
        func = Function.apply(null, __slice.call(tmplParams).concat([tmplSource]));
        tmpl = func.bind(context);
        tmpl.filename = options.filename;
        tmpl.toString = func.toString.bind(func);
        tmpl.toSource = function() {
          return source;
        };
      } catch (error) {
        error.templateSource = tmplSource;
        throw error;
      }
      return tmpl;
    };

    Bliss.prototype.compileFile = function(filename, options) {
      var entry, filepath, p, self, stat, _compileFile;
      self = this;
      options = defaults(options, this.options, {
        filename: filename,
        ext: (p = filename.indexOf('.')) >= 0 ? filename.slice(p) : ''
      });
      filepath = filename;
      stat = void 0;
      try {
        stat = fs.statSync(filepath);
      } catch (thrown) {
        try {
          filepath = filepath + options.ext;
          stat = fs.statSync(filepath);
        } catch (thrown) {
          throw thrown;
        }
      }
      _compileFile = function() {
        var source, template;
        source = fs.readFileSync(filepath, 'utf8');
        return template = self.compile(source, options);
      };
      if (options.cacheEnabled) {
        if (this.cache[filepath] != null) {
          entry = this.cache[filepath];
          if (stat.mtime > entry.mtime) {
            entry.filename = filepath;
            entry.mtime = Date.now();
            entry.template = _compileFile();
            this.cache[filepath] = entry;
            return entry.template;
          } else {
            return entry.template;
          }
        } else {
          entry = {};
          entry.filename = filepath;
          entry.mtime = Date.now();
          entry.template = _compileFile();
          this.cache[filepath] = entry;
          return entry.template;
        }
      } else {
        return _compileFile();
      }
    };

    Bliss.prototype.render = function() {
      var args, filename, template;
      filename = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      template = this.compileFile(filename);
      return template.apply(null, args);
    };

    return Bliss;

  })();

  if (module !== void 0) module.exports = Bliss;

  this.Bliss = Bliss;

  this.bliss = new Bliss();

  this.bliss.compileNode = function(node) {
    var id, output, source, template;
    id = node.id;
    source = node.innerHTML;
    if (source) {
      template = bliss.compile(source, {
        context: window
      });
      if (id && window) {
        window[id] = template;
        node.parentNode.removeChild(node);
      } else {
        output = document.createElement("div");
        output.innerHTML = template();
        node.parentNode.replaceChild(output, node);
      }
    }
  };

  this.bliss.compileNodeList = function(nodeList) {
    var node, _i, _len;
    for (_i = 0, _len = nodeList.length; _i < _len; _i++) {
      node = nodeList[_i];
      try {
        this.compileNode(node);
      } catch (error) {
        console.error('[error]', error);
      }
    }
  };

}).call(this);