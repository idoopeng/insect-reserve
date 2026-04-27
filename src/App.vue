<template>
  <div class="reserve-box">
    <h2>昆虫馆参观预约</h2>

    <div class="item">
      <label>所属学院：</label>
      <input v-model="college" type="text" placeholder="请输入你的学院" />
    </div>

    <div class="item">
      <label>你的姓名：</label>
      <input v-model="name" type="text" placeholder="请输入你的姓名" />
    </div>

    <button class="btn" @click="submitReserve">立即预约</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const college = ref('')
const name = ref('')
const API_URL = "/api/submit";

const submitReserve = async () => {
  if (!college.value || !name.value) {
    alert('学院和姓名不能为空！')
    return
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        college: college.value,
        name: name.value
      })
    })

    const data = await res.json()
    if (data.success) {
      alert('预约成功！欢迎参观昆虫馆')
      college.value = ''
      name.value = ''
    } else {
      alert('提交失败：' + data.error)
    }
  } catch (err) {
    alert('网络错误，请稍后再试')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh; /* 关键改动：保证页面高度是全屏 */
  background-image: url('./assets/bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: sans-serif; /* 加个通用字体，手机上显示更稳 */
}
</style>

<style scoped>
.reserve-box {
  width: 90%;
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px 20px;
  border-radius: 10px;
}

.item {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label{
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 30px;
  font-size: 16px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>