'use strict';

import { JSONAtaExpression, ResponseInterceptorResult, validateJsonAtaExpression } from '../../config/proxy';

const jsonata = require('jsonata');
module.exports = function(config: JSONAtaExpression) {
    validateJsonAtaExpression(config);
    const expression = jsonata(config.expression);
    return (body: any, headers: any, request: any) => {
        return new Promise<ResponseInterceptorResult>((resolve, reject) => {
            try {
                const bodyData = JSON.parse(body);
                const result = expression.evaluate(bodyData);
                resolve({ body: result });
            } catch (e) {
                return reject(e);
            }
        });
    };
};
