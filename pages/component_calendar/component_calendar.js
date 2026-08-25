Component({
    data:{
    },

    //外部传入的数据，可以用于组件的渲染
    properties:{
        openState:{
            type : String,
            value : 'Unknown'
        },
        isToday:{
            type : Boolean,
            value : false
        }
    },

    methods:{
        unknown:function () {
            wx.showToast({
                title: '开放状态待定，敬请等待',
                icon: 'none'
              })
        },

        open:function() {
            wx.navigateTo({
              url: '/pages/reservationtable/reservationtable',
            })
        },

        closed:function () {
            wx.showToast({
              title: '人博馆今日闭馆',
            })
        },
            
    }
})
