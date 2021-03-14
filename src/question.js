const question = [
    {
        name:'conf',
        type:'confirm',
        message:'是否创建新项目?',
    },
    {
        name:'name',
        message:'请输入项目名称: ',
        when: res => Boolean(res.conf)
    },
    {
        name: 'author',
        message:'请输入作者名称: ',
        when: res => Boolean(res.conf)
    },
    {
        type:'list',
        name:'template',
        message:'请选择需要创建的模板',
        choices:['vue-template','react-template'],
        filter: function(val){
            return val.toLowerCase()
        },
        when: res => Boolean(res.conf)
    }
]

module.exports = question;