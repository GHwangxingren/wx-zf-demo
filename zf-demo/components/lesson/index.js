// components/lesson/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties:{
    item:{
      type:Object,
      value:{}
    }
  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      let item=this.properties.item;
      let detail={
        id:item.id,
        title:item.title
      }
      this.triggerEvent("myEvent",detail)
    }
  }
})