// pages/caption_secondFloor/caption_secondFloor.js

Page({
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    },
  
      data: {
        
        // 缩放相关
        scale: 1,
        minScale: 0.5,
        maxScale: 3,
        
        // 位置相关
        position: {
          x: 0,
          y: 0
        },
        
        // 触摸状态
        touchState: {
          type: 'none',        // 'none', 'drag', 'pinch'
          startX: 0,           // 单指拖动起始X
          startY: 0,           // 单指拖动起始Y
          lastX: 0,            // 上一次位置X
          lastY: 0,            // 上一次位置Y
          distance: 0,         // 双指距离
          lastScale: 1,        // 上一次缩放比例
        },
  
          // 控制弹窗显示隐藏
        showModal1: false,  
        showModal2: false, 
        showModal3: false, 
        showModal4: false, 
        showModal5: false, 
        showModal6: false,  
        showModal7: false,  
        showModal9: false,  
        showModal10: false,  
        showModal11: false,  
        showModal12: false,  
      },
    
      // 触摸开始
      onTouchStart(e) {
        const touches = e.touches;
        
        if (touches.length === 1) {
          // 单指触摸 - 准备拖动
          this.setData({
            'touchState.type': 'drag',
            'touchState.startX': touches[0].clientX,
            'touchState.startY': touches[0].clientY,
            'touchState.lastX': this.data.position.x,
            'touchState.lastY': this.data.position.y
          });
        } 
        else if (touches.length === 2) {
          // 双指触摸 - 准备缩放
          const distance = this.getDistance(touches[0], touches[1]);
          this.setData({
            'touchState.type': 'pinch',
            'touchState.distance': distance,
            'touchState.lastScale': this.data.scale
          });
        }
      },
    
      // 触摸移动
      onTouchMove(e) {
        
        const touches = e.touches;
        const touchState = this.data.touchState;
        
        if (touchState.type === 'drag' && touches.length === 1) {
          // 单指拖动
          const deltaX = touches[0].clientX - touchState.startX;
          const deltaY = touches[0].clientY - touchState.startY;
          
          // 计算新位置（基于当前缩放比例调整移动速度）
          const newX = touchState.lastX + deltaX;
          const newY = touchState.lastY + deltaY;
          
          this.setData({
            'position.x': newX,
            'position.y': newY
          });
        }
        else if (touchState.type === 'pinch' && touches.length === 2) {
          // 双指缩放
          const distance = this.getDistance(touches[0], touches[1]);
          
          // 计算缩放比例
          let newScale = touchState.lastScale * (distance / touchState.distance);
          
          // 限制缩放范围
          newScale = Math.min(this.data.maxScale, Math.max(this.data.minScale, newScale));
          
          this.setData({
            scale: newScale
          });
          
          // 可选：根据缩放调整移动速度或位置
          // 这里不做位置调整，保持拖动的自然感
        }
      },
    
      // 触摸结束
      onTouchEnd(e) {
        // 重置触摸状态
        this.setData({
          'touchState.type': 'none'
        });
      },
    
      // 计算两点之间的距离
      getDistance(p1, p2) {
        const x = p2.clientX - p1.clientX;
        const y = p2.clientY - p1.clientY;
        return Math.sqrt(x * x + y * y);
      },
    
      // 重置视图
      resetView() {
        this.setData({
          scale: 1,
          position: { x: 0, y: 0 }
        });
      },
    
      // 可选：边界限制（防止拖出屏幕太远）
      applyBoundary() {
        // 如果需要限制拖动范围，可以在这里实现
        // 比如不让内容拖出屏幕太远
      },
  
      // 显示弹窗
      showScrollModal1() {
          this.setData({
            showModal1: true,
          })
        },
        showScrollModal2() {
          this.setData({
            showModal2: true,
          })
        },
        showScrollModal3() {
          this.setData({
            showModal3: true,
          })
        },
        showScrollModal4() {
          this.setData({
            showModal4: true,
          })
        },
        showScrollModal5() {
          this.setData({
            showModal5: true,
          })
        },
        showScrollModal6() {
            this.setData({
              showModal6: true,
            })
          },
          showScrollModal7() {
            this.setData({
              showModal7: true,
            })
          },
          showScrollModal9() {
            this.setData({
              showModal9: true,
            })
          },
          showScrollModal10() {
            this.setData({
              showModal10: true,
            })
          },
          showScrollModal11() {
            this.setData({
              showModal11: true,
            })
          },
          showScrollModal12() {
            this.setData({
              showModal12: true,
            })
          },
      
        // 隐藏弹窗
        hideModal1() {
          this.setData({
            showModal1: false
          })
        },
        hideModal2() {
          this.setData({
            showModal2: false
          })
        },
        hideModal3() {
          this.setData({
            showModal3: false
          })
        },
        hideModal4() {
          this.setData({
            showModal4: false
          })
        },
        hideModal5() {
          this.setData({
            showModal5: false
          })
        },
        hideModal6() {
            this.setData({
              showModal6: false
            })
          },
          hideModal7() {
            this.setData({
              showModal7: false
            })
          },
          hideModal9() {
            this.setData({
              showModal9: false
            })
          },
          hideModal10() {
            this.setData({
              showModal10: false
            })
          },
          hideModal11() {
            this.setData({
              showModal11: false
            })
          },
          hideModal12() {
            this.setData({
              showModal12: false
            })
          },
      
        // 阻止遮罩层点击事件冒泡到弹窗内容
        preventTouchMove() {
          return
        }
  })
