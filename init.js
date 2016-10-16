// Init

/*

What we need:
  DOM (liked tree of nodes)
  nodes
  window
  Elements

*/

const GLOBAL_DEFAULTS = {
  render_comments: true
};

class Node {
  constructor(id, parent, siblings) {
    this.id = id;
    this.parent = parent;
    this.siblings = siblings;
  }
  getParent() {
    return this.parent;
  }
  getSiblings() {
    return this.siblings;
  }

  removeNode() {
    for (let node in this.siblings) {
      node.setParent(this.parent);
    }
    delete this.parent;
    delete this.siblings;
    delete this.id;
  }

  setParent(node) {
    this.parent = node;
  }

  adoptSibling(node) {
    this.siblings = [...siblings, node];
    node.setParent(this);
  }
}

class Element extends Node {
  constructor(id, parent, name, tag, attributes, content, global_settings, state) {
    super(id, parent, content.nodes);
    this.name = name;
    this.tag = tag;
    this.attributes = attributes;
    this.content = content
    this.global_settings = global_settings;
    this.state = state;
  }

  render() {
    let attribute_literal = ``;
    for (let key in this.attributes) {
      attribute_literal += `${key}="${this.attributes[key]}" `;
    }
    let content_literal = ``;
    for (let key in this.content) {
      switch (key) {
        case "nodes":
          for (let node in this.content.nodes) {
            content_literal += node.render();
          }
        case "comments":
          if(this.global_settings.render_comments) {
            for (let comment in this.content.comments) {
              content_literal += `<!-- ${this.content.comments[comment]} -->`;
            }
          }
        case "text":
          content_literal += `${this.content.text}`;
      }
    }
    return (
      `<${this.tag} metal-name="${this.name}" metal-id="${this.id}" ${attribute_literal}>${content_literal}</${this.tag}>`
    )
  }
}

class DocumentObjectModel {
  constructor(rootElement, scope, state, )
}
