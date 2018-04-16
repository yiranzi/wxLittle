const querystring = require('querystring')
const http = require('http')
function getNowData (macId, type) {
    return new Promise((resolve, reject) => {
        const postData = querystring.stringify({
            'MAC': macId,
            'type': type
        });

        const options = {
            hostname: 'radar.omesoft.com',
            port: 80,
            path: '/asyncmsg.asyn',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        // 每次请求的最大延迟时间
        const maxWait = 8000
        let getResponse = false
        setTimeout(() => {
            if (!getResponse) {
                reject(false)
            }
        }, maxWait)

        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            var data = ''
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                data += chunk
            });
            res.on('end', () => {
                getResponse = true
                console.log('No more data in response.');
                resolve(JSON.parse(data))
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
          });

        // write data to request body
        req.write(postData);
        req.end();
    })
}

// function postMyData (data, macId) {
//     console.log('!!!!!zzzzzzzzz!!!!')
//     return new Promise((resolve, reject) => {
//         let {date, isbed, heart ,resp ,turn} = data
//         const postData = querystring.stringify([{
//             'mac': macId,
//             'heartRate': heart,
//             'respiratoryRate': resp,
//             'turn': turn,
//             'online': 1,
//             'isbed': 1,
//             'timeStamp': date,
//         }]);

//         const options = {
//         hostname: 'test.radar.com',
//         port: 80,
//         path: '/api/sendData',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             'Content-Length': Buffer.byteLength(postData)
//         }
//         };

//         const req = http.request(options, (res) => {
//             console.log(`STATUS: ${res.statusCode}`);
//             console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//             res.setEncoding('utf8');
//             var data = ''
//             res.on('data', (chunk) => {
//                 console.log(`BODY: ${chunk}`);
//                 data += chunk
//             });
//             res.on('end', () => {
//                 console.log('No more data in response.');
//                 resolve(data)
//             });
//         });

//         req.on('error', (e) => {
//             console.error(`problem with request: ${e.message}`);
//           });

//         // write data to request body
//         req.write(postData);
//         req.end();
//     })
// }

module.exports = async ctx => {
    let {macId, type} = ctx.request.body
    try {
        let data = await getNowData(macId, type)
        console.log(data)
        console.log('finish')
        // let postData = await postMyData(data.data[0], macId)
        ctx.state.data = data.data[0]
    } catch (e) {
        ctx.state.data = false
    }

}