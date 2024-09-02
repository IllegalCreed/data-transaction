<template>
  <div class="header-root-container">
    <img absolute bottom-0 max-w-200 class="w-1/2 right-1/4" src="../assets/header_texture.jpg" />
    <div absolute inset-0 flex flex-row items-center justify-between pl-10 pr-10>
      <img src="../assets/logo.jpg" w-60 />
      <div flex flex-row items-center space-x-4>
        <div flex justify-center items-center h-12 w-12 rounded-full class="bg-white/80">
          <i-fa-solid:user h-6 w-6 color-white></i-fa-solid:user>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <div flex flex-row items-center space-x-2>
            <span class="user-text" cursor-pointer>欢迎，管理员 </span>
            <i-mingcute:down-line color-white></i-mingcute:down-line>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="change">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogPwdVisible" title="修改密码" width="600">
    <div class="pwd-dialog">
      <el-form :model="userPwd" :rules="rules" ref="formRef" label-width="auto" style="width: 400px">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="userPwd.oldPwd" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="userPwd.newPwd" type="password" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPwd">
          <el-input v-model="userPwd.repeatPwd" type="password" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogPwdVisible = false">取消</el-button>
        <el-button type="primary" @click="handleResetPwd"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { useAccountStore } from "@/stores/modules/account";
import { successMessage } from "@/utils/messageBox";

const { logout, resetPwd } = useAccountStore();

const dialogPwdVisible = ref(false);

const userPwd = ref({
  oldPwd: "",
  newPwd: "",
  repeatPwd: "",
});

const formRef = ref<FormInstance>();
const validateNewPwd = (rule: any, value: any, callback: any) => {
  const regex =
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,20}$/;
  if (!regex.test(userPwd.value.newPwd)) {
    callback(new Error("密码必须大于8位，且至少包含大小写字母数字及特殊字符"));
  } else {
    callback();
  }
};

const validateRepeatPwd = (rule: any, value: any, callback: any) => {
  if (userPwd.value.newPwd !== userPwd.value.repeatPwd) {
    callback(new Error("请保证两次输入的密码一致"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<any>>({
  oldPwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  newPwd: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { validator: validateNewPwd, trigger: "blur" },
  ],
  repeatPwd: [
    { required: true, message: "重复密码不能为空", trigger: "blur" },
    { validator: validateRepeatPwd, trigger: "blur" },
  ],
});

const handleCommand = (command: string) => {
  switch (command) {
    case "logout":
      logout();
      break;
    case "change":
      dialogPwdVisible.value = true;
      break;
    default:
  }
};

async function handleResetPwd() {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      resetPwd(userPwd.value.oldPwd, userPwd.value.newPwd).then(() => {
        successMessage('保存')
        dialogPwdVisible.value = false
      })
    }
  })
}
</script>

<style scoped>
.header-root-container {
  --at-apply: h-20 relative;
  background-color: var(--primary-color);
}

.header-user-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-root-container :deep(.el-switch.is-checked .el-switch__core) {
  background-color: var(--el-switch-off-color);
  border-color: var(--el-switch-border-color, var(--el-switch-off-color));
}

.user-text {
  color: var(--text-white-color);
}

.user-text:hover {
  color: var(--text-white-highlight-color);
}
</style>
