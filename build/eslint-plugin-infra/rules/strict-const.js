export default {
  meta: {
    type: "problem",
    docs: {
      description: "Runtime constants have to be used with globalThis",
    },
    schema: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            "buildTimeConstants": { type: "array" }
          }
        },
      ]
    }
  },
  create(context) {
    const [{ buildTimeConstants }] = context.options;

    return {
      Identifier(node) {
        if (!isConstant(node.name)) return;

        const isBuildTime = buildTimeConstants.includes(node.name);
        const isAncestorMember = isMemberExpression(node.parent);

        if (isBuildTime) {
          if (isAncestorMember) {
            return context.report({
              node,
              message: "Wrong usage of buildtime const, please use {{ identifier }} without {{ objectName }}",
              data: {
                identifier: node.name,
                objectName: node.parent.object.name,
              }
            });
          } else {
            return;
          }
        }

        if (isAncestorMember) return;
        if (isPropertyKey(node)) return;
        if (isVariableDeclaratorId(node)) return;
        if (isFunctionDeclarationId(node)) return;
        if (isFunctionDeclarationParam(context.sourceCode.getAncestors(node), node)) return;

        return context.report({
          node,
          message: "Wrong usage of runtime const, please use globalThis.{{ identifier }}",
          data: {
            identifier: node.name
          }
        });
      }
    };
  }
}

const isConstant = (name) => name === name.toUpperCase();

const isPropertyKey = (node) => node.parent.type === 'Property' && node.parent.key === node;

const isVariableDeclaratorId = (node) => node.parent.type === 'VariableDeclarator' && node.parent.id === node;

const isFunctionDeclarationId = (node) => node.parent.type === 'FunctionDeclaration' && node.parent.id === node;

const isFunctionDeclarationParam = (allAncestors, node) =>
  allAncestors
    .filter((a) => a.type === "FunctionDeclaration" || a.type === "ArrowFunctionExpression")
    .some((fn) => fn.params.some((p) => p.name === node.name));

const isMemberExpression = (node) => node.type === 'MemberExpression';

// # Variants:

// ## Check against ancestors:
// Property#value#type === Identifier
// VariableDeclarator#init#type === Identifier
// BinaryExpression#(left|right)#type === Identifier
// CallExpression#arguments (one of)#type === Identifier
// TemplateLiteral#expressions (one of)#type === Identifier
// MemberExpression#property#type === Identifier

// ## Allowed constant-like Identifiers (Do NOT check against ancestors)
// Property#key
// VariableDeclarator#id
// FunctionDeclaration#id
// FunctionDeclaration#params
// ancestors is MemberExpression