
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