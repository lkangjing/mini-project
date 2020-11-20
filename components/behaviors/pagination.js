const pagination = Behavior({
    data:{
        dataArr:[]
    },
    methods:{
        setDataArr(newArr){
            const tempArr = this.data.dataArr.concat(newArr)
            this.setData({
                dataArr:tempArr
            })
        }
    }
})