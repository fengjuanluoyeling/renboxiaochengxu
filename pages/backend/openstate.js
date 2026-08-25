// pages/backend/openstate.js
// pages/index/index.js
Page({
    data: {
      // 当前选中的模式: 'open' 或 'closed'
      currentMode: 'open',
      // 二维数组: 第一维是月份(0-11, 但索引0对应8月,1对应9月...11对应7月)
      // 第二维是当月日期，值: 'open' 或 'closed'
      dateStatus: [],
      // 存储所有日期用于渲染
      calendarData: [],
      // 年份基准: 起始年2024, 跨年处理
      baseYear: 2024
    },
  
    onLoad() {
      this.initCalendar();
    },
  
    // 初始化日历和二维数组
    initCalendar() {
      // 月份顺序: 8月,9月,10月,11月,12月,1月,2月,3月,4月,5月,6月,7月
      const months = [
        { name: '8月', monthIndex: 7, year: this.data.baseYear, monthIdx: 0 },
        { name: '9月', monthIndex: 8, year: this.data.baseYear, monthIdx: 1 },
        { name: '10月', monthIndex: 9, year: this.data.baseYear, monthIdx: 2 },
        { name: '11月', monthIndex: 10, year: this.data.baseYear, monthIdx: 3 },
        { name: '12月', monthIndex: 11, year: this.data.baseYear, monthIdx: 4 },
        { name: '1月', monthIndex: 0, year: this.data.baseYear + 1, monthIdx: 5 },
        { name: '2月', monthIndex: 1, year: this.data.baseYear + 1, monthIdx: 6 },
        { name: '3月', monthIndex: 2, year: this.data.baseYear + 1, monthIdx: 7 },
        { name: '4月', monthIndex: 3, year: this.data.baseYear + 1, monthIdx: 8 },
        { name: '5月', monthIndex: 4, year: this.data.baseYear + 1, monthIdx: 9 },
        { name: '6月', monthIndex: 5, year: this.data.baseYear + 1, monthIdx: 10 },
        { name: '7月', monthIndex: 6, year: this.data.baseYear + 1, monthIdx: 11 }
      ];
  
      // 初始化二维数组和日历数据
      let dateStatus = [];
      let calendarData = [];
      
      // 记录每周的日期数据（用于按周分组）
      let allDateItems = [];
  
      for (let m = 0; m < months.length; m++) {
        const month = months[m];
        const daysInMonth = this.getDaysInMonth(month.year, month.monthIndex);
        
        // 初始化当月二维数组，默认未知
        let monthStatus = new Array(daysInMonth).fill('Unknown');
        dateStatus.push(monthStatus);
        
        // 收集该月的所有日期对象
        for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(month.year, month.monthIndex, d);
          const weekIndex = this.getWeekOfYear(date);
          
          allDateItems.push({
            id: `${month.year}-${month.monthIndex}-${d}`,
            year: month.year,
            monthIndex: month.monthIndex,
            monthName: month.name,
            monthIdx: month.monthIdx,
            day: d,
            dayIdx: d - 1, // 转为0-based索引
            weekIndex: weekIndex,
            status: 'closed',
            dateObj: date
          });
        }
      }
      
      // 按周分组
      const weeksMap = new Map();
      allDateItems.forEach(item => {
        const key = `${item.year}-W${item.weekIndex}`;
        if (!weeksMap.has(key)) {
          weeksMap.set(key, []);
        }
        weeksMap.get(key).push(item);
      });
      
      // 转换为数组并按周排序
      let weeksArray = Array.from(weeksMap.values());
      // 按第一天的日期排序
      weeksArray.sort((a, b) => a[0].dateObj - b[0].dateObj);
      
      calendarData = weeksArray;
      
      this.setData({
        dateStatus: dateStatus,
        calendarData: calendarData
      });
    },
  
    // 获取某月的天数
    getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
  
    // 获取日期所在的周数（ISO周数）
    getWeekOfYear(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return weekNo;
    },
  
    // 切换模式
    switchMode(e) {
      const mode = e.currentTarget.dataset.mode;
      if (mode === this.data.currentMode) return;
      
      this.setData({
        currentMode: mode
      });
    },
  
    // 点击日期
    onDateTap(e) {
      const { monthIdx, dayIdx } = e.currentTarget.dataset;
      
      const newStatus = this.data.currentMode; // 'open' 或 'closed'
      
      // 更新二维数组
      let dateStatus = this.data.dateStatus;
      if (dateStatus[monthIdx] && dateStatus[monthIdx][dayIdx] !== undefined) {
        dateStatus[monthIdx][dayIdx] = newStatus;
      } else {
        console.error('日期索引无效', monthIdx, dayIdx);
        return;
      }
      
      // 更新日历视图数据
      let calendarData = this.data.calendarData;
      // 遍历找到对应的日期并更新状态
      for (let w = 0; w < calendarData.length; w++) {
        const week = calendarData[w];
        for (let d = 0; d < week.length; d++) {
          const item = week[d];
          if (item.monthIdx === monthIdx && item.dayIdx === dayIdx) {
            item.status = newStatus;
            break;
          }
        }
      }
      
      this.setData({
        dateStatus: dateStatus,
        calendarData: calendarData
      });
      
      // 调试输出
      console.log('更新二维数组:', dateStatus);
    },
  
    // 保存
    exportData() {
        app.setDateStatus(dateStatus);
      wx.showModal({
        title: '已保存',
        content: JSON.stringify(this.data.dateStatus).substring(0, 200) + '...',
        showCancel: false
      });
    }
  });