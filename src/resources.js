const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
    var host = 'http://172.16.2.221:8080'; // 公司
    // var host = 'http://192.168.1.23:8080'; // 宿舍
} else {
    //正式环境地址
    var host = 'http://172.16.2.221:8080'; // 公司
    // var host = 'http://192.168.1.23:8080'; // 宿舍
}
console.warn('当前resource: ', host);

let resources = {
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`
};

export default resources;
