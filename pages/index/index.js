//
const app = getApp()
Page({
    onLoad(){
        const t = new Date();
        this.month=t.getMonth();
        this.year=t.getFullYear();
        //获得时间年月日
        t.setFullYear(this.year,this.month,1);
        this.getcanledar(t);//渲染日历
    },

    onShow() {
        // 每次切换到该 Tab 时都检查
        // 这是 TabBar 页面接收数据的关键！
        console.log('TabBar 页面显示，检查全局数据')
        this.checkGlobalData()
      },

      checkGlobalData() {
        // 检查是否有待接收的数据
        if (app.globalData.announcement) {
          console.log('接收到数据:', app.globalData.announcement)

          // 更新页面显示
          this.setData({
            content: app.globalData.announcement,
            announcementText: app.globalData.announcement,
          })
        }
    },

    data:{
        openstate:[
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年一月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年二月29天（28或29）
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年三月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年四月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年五月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年六月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年七月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//八月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//九月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十一月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十二月31天
        ],//长长的一个数组
        openStateThisMonth:['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//31个元素的数组
        displayContent: ''  ,// 用于 text 组件显示的内容
        expanded:false,
        year:0,
        month:0,
        days:[],
        t:[],
        content:null,
        announcementText:'寒暑假期间，浙江大学人体博物馆不开放',
        todayIndex:-1,
        statusSummary:{
            open:0,
            closed:0,
            unknown:0
        },
    },

    toggle() {
        this.setData({ expanded: !this.data.expanded })
    },

    visitNavigation() {
        wx.navigateTo({
            url: '/pages/visitNavigation/visitNavigation',
        })
    },

   getcanledar:function(t){
    const openState=app.getOpenStateCopy();

    const daysInCurrentMonth = new Date(this.year, this.month + 1, 0).getDate();
    const whatday=t.getDay();//判断星期几（0-6）
    const totalSlots = Math.max(35, Math.ceil((daysInCurrentMonth + whatday) / 7) * 7);
    const days=new Array(totalSlots);//数组days包含本月的所有日期，用于渲染日历
    for(let i=whatday;i<daysInCurrentMonth+whatday;i++){
        days[i]=i-whatday+1;
    };

    const monthStatus = this.getMonthOpenStatus(openState, daysInCurrentMonth);
    let OpenStateThisMonth = [
        ...new Array(whatday).fill('blank'),
        ...monthStatus,
        ...new Array(totalSlots - whatday - daysInCurrentMonth).fill('blank')
    ];
    const today = new Date();
    const todayIndex = this.year === today.getFullYear() && this.month === today.getMonth()
        ? whatday + today.getDate() - 1
        : -1;
    const statusSummary = this.getStatusSummary(monthStatus);

    this.setData({
        openstate:openState,
        days:days,
        year:this.year,
        month:this.month+1,
        openStateThisMonth:OpenStateThisMonth,
        todayIndex:todayIndex,
        statusSummary:statusSummary,
    });
   },//数组openstate更新，小写对应index页面的数组，大写对应app.js里的数组

   getMonthOpenStatus:function(openState, daysInCurrentMonth){
    const storedMonthStatus = openState[this.month] || [];
    const monthStatus = new Array(daysInCurrentMonth).fill('Unknown').map((_, index) => {
        return storedMonthStatus[index] || 'Unknown';
    });

    // 临时规则：9月份周末全部开馆。
    if (this.month === 8) {
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const weekDay = new Date(this.year, this.month, day).getDay();
            if (weekDay === 0 || weekDay === 6) {
                monthStatus[day - 1] = 'open';
            }
        }
    }

    return monthStatus;
   },

   getStatusSummary:function(monthStatus){
    return monthStatus.reduce((summary, status) => {
        if (status === 'open') {
            summary.open++;
        } else if (status === 'closed') {
            summary.closed++;
        } else {
            summary.unknown++;
        }
        return summary;
    }, { open:0, closed:0, unknown:0 });
   },

    showMonth:function(targetDate) {
        this.year = targetDate.getFullYear();
        this.month = targetDate.getMonth();
        this.getcanledar(targetDate);
    },

    getCurrentMonthStart:function() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    },

    getAcademicEndMonth:function() {
        const now = new Date();
        const academicStartYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
        return new Date(academicStartYear + 1, 6, 1);
    },

    lastmonth:function() {
        const currentMonth = new Date(this.year, this.month, 1);
        if(currentMonth <= this.getCurrentMonthStart()){
            wx.showToast({
             title: '以往开放记录不可查',
             icon:'none'
            })
            return;
        }

        currentMonth.setMonth(currentMonth.getMonth() - 1);
        this.showMonth(currentMonth);
    },

    nextmonth:function () {
        const currentMonth = new Date(this.year, this.month, 1);
        if(currentMonth >= this.getAcademicEndMonth()){
            wx.showToast({
                title: '下一学年数据待更新',
                icon:'none'
               })
            return;
        }

        currentMonth.setMonth(currentMonth.getMonth() + 1);
        this.showMonth(currentMonth);
    }

})
