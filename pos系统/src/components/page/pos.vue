<template>
  <div class="pos">
    <el-row>
      <el-col :span='8' class="pos-order" id="order-list">
        <el-tabs v-model="activeName">
          <el-tab-pane></el-tab-pane>
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" border style="width:100%" align="center">
              <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="count" label="数量" width="50" align="center"></el-table-column>
              <el-table-column prop="price" label="金额" width="70" align="center"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalCount">
              <span><small>数量：</small>{{totalCount}}</span>
              <span><small>金额：</small>{{totalMoney}}元</span>
            </div>
            <div class="tab-btn">
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='16'>
        <div class="hot-goods">
          <div class="title">热销商品</div>
          <div class="hot-goods-list">
            <ul>
              <li v-for="(item,index) in hotGoods" :key="index" @click="addOrderList(item)">
                <span>{{item.goodsName}}</span>
                <span class="goods-price">￥{{item.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs v-model="goodsActiveName">
            <el-tab-pane></el-tab-pane>
            <el-tab-pane label="御品*奶茶" name="first">
              <ul class='cookList'>
                <li v-for="(item,index) in type0Goods" :key="index" @click="addOrderList(item)">
                  <span class="teaImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="teaName">{{item.goodsName}}</span>
                  <span class="teaPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="御品*奶盖">
              <ul class='cookList'>
                <li v-for="(item,index) in type1Goods" :key="index" @click="addOrderList(item)">
                  <span class="teaImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="teaName">{{item.goodsName}}</span>
                  <span class="teaPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="健康果茶">
              <ul class='cookList'>
                <li v-for="(item,index) in type2Goods" :key="index" @click="addOrderList(item)">
                  <span class="teaImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="teaName">{{item.goodsName}}</span>
                  <span class="teaPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="沙冰*系列">
              <ul class='cookList'>
                <li v-for="(item,index) in type3Goods" :key="index">
                  <span class="teaImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="teaName">{{item.goodsName}}</span>
                  <span class="teaPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data () {
    return {
      tableData: [],
      hotGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      activeName: 'first',
      goodsActiveName: 'first',
      totalMoney: 0,
      totalCount: 0
    }
  },
  created: function () {
    axios.get('https://www.easy-mock.com/mock/5b27e1d1555eff092b541b95/pos/hotGoods')
      .then((response) => {
        this.hotGoods = response.data
      })
      .catch((error) => {
        console.log(error)
        alert('网络错误，不能访问')
      })

    axios.get('https://www.easy-mock.com/mock/5b27e1d1555eff092b541b95/pos/typeGoods')
      .then((response) => {
        this.type0Goods = response.data[0]
        this.type1Goods = response.data[1]
        this.type2Goods = response.data[2]
        this.type3Goods = response.data[3]
      })
      .catch((error) => {
        console.log(error)
        alert('网络错误，不能访问')
      })
  },
  mounted: function () {
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  methods: {
    addOrderList (goods) {
      this.totalMoney = 0
      this.totalCount = 0

      // 商品是否已经存在于订单列表中
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }

      // 根据判断的值编写业务逻辑
      if (isHave) {
        // 改变列表中商品数量
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1}
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    // 删除单个商品
    delSingleGoods (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllMoney()
    },
    // 删除全部商品
    delAllGoods () {
      this.tableData = []
      this.totalMoney = 0
      this.totalCount = 0
    },
    checkout () {
      if (this.totalCount !== 0) {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '结账成功',
          type: 'success'
        })
      } else {
        this.$message.error('不能空结！')
      }
    },
    getAllMoney () {
      this.totalMoney = 0
      this.totalCount = 0

      if (this.tableData) {
        // 计算汇总金额和数量
        this.tableData.forEach(element => {
          this.totalCount += element.count
          this.totalMoney = this.totalMoney + (element.count * element.price)
        })
      }
    }
  }
}
</script>

<style>
ul {
  margin: 0;
}
.pos-order {
  background: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.totalCount {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #D3dce6;
}
.totalCount span {
  text-align: center;
  padding: 0 20px;
}
.tab-btn {
  margin-top: 20px;
  text-align: center;
}
.title{
  height: 20px;
  border-bottom:1px solid #D3DCE6;
  background-color: #F9FAFC;
  padding:10px 10px 10px 20px;
}
.hot-goods-list ul li{
  list-style: none;
  float:left;
  border:1px solid #E5E9F2;
  padding:10px;
  margin:5px;
  background-color:#fff;
  cursor: pointer;
}
.goods-price{
  color:#f74342;
}
.goods-type {
  clear: both;
}
.cookList li{
  list-style: none;
  width:16%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 6px;
}
.cookList li span{
  display: block;
  float:left;
}
.teaImg{
  width: 40%;
}
.teaImg img {
  vertical-align: middle;
}
.teaName{
  font-size: 16px;
  padding-left: 10px;
  color:brown;
  margin-top: 4px;
}
.teaPrice{
  font-size: 16px;
  padding-left: 10px;
  margin-top: 24px;
}
.goods-type {
  height: auto;
  overflow: hidden;
  border: 1px solid #D3dce6;
  border-left: none;
}
.hot-goods-list {
  padding: 20px 0;
  overflow: hidden;
}
.el-tabs__header {
  margin: 0;
}
.el-tabs__content {
  padding: 20px 0;
}
</style>
