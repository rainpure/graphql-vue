const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
    var host = 'http://localhost:8080';
} else {
    //正式环境地址
    var host = 'http://localhost:8080';
}
console.warn('当前resource: ', host);

let resources = {
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`
};

export default resources;
