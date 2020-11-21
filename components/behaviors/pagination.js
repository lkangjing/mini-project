const paginationBhv = Behavior({
    data:{
        dataArr:[],
        total:null
    },
    methods:{
        setDataArr(newArr){
            const tempArr = this.data.dataArr.concat(newArr)
            this.setData({
                dataArr:tempArr
            })
        },
        getCurrentStart(){
            return this.data.dataArr.length
        },
        setTotal(total){
            this.data.total = total
        },
        hasMore(){
            if (this.data.dataArr.length>=this.data.total) {
                return false
            }else{
                return true
            }
        },
        initialLize(){
            this.setData({
                dataArr:[]
            })
            this.data.total = null
        }
    }
})

export {
    paginationBhv
}