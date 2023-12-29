const hbs = require('hbs');

hbs.registerHelper('compare', function (v1, operator, v2, options) {
    const operators = {
      '==': v1 == v2,
      '===': v1 === v2,
      '!=': v1 != v2,
      '!==': v1 !== v2,
      '<': v1 < v2,
      '<=': v1 <= v2,
      '>': v1 > v2,
      '>=': v1 >= v2,
      '&&': v1 && v2,
      '||': v1 || v2
    };
  
    if (operators[operator]) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });