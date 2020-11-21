const paginationBhv = Behavior({
    data:{
        dataArr:[],
        total:null,
        noneResult:false
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
            if (total == 0) {
                this.setData({
                    noneResult:true
                })
            }
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
                dataArr:[],
                noneResult:false
            })
            this.data.total = null
        }
    }
})

export {
    paginationBhv
}