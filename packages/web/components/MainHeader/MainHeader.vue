<template>
  <el-header height="15vh" class="header">
    <el-form ref="userForm" class="header__form" :model="user" status-icon :rules="rules">
      <el-row :gutter="20">
        <el-col :md="7" :sm="24">
          <el-form-item prop="firstName">
            <el-input v-model.trim="user.firstName" class="header__input" placeholder="First name" @blur="validateForm" />
          </el-form-item>
        </el-col>
        <el-col :md="7" :sm="24">
          <el-form-item prop="lastName">
            <el-input v-model.trim="user.lastName" class="header__input" placeholder="Last name" @blur="validateForm" />
          </el-form-item>
        </el-col>
        <el-col :md="7" :sm="24">
          <el-form-item prop="participation">
            <el-input
              v-model.number="user.participation"
              type="number"
              min="1"
              max="100"
              step="1"
              class="header__input"
              placeholder="Participation"
              @input="validateForm"
            />
          </el-form-item>
        </el-col>

        <el-col :md="3" :sm="24">
          <el-button :disabled="!isValid" plain class="header__button" @click="submitForm()">
            SEND
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Form } from 'element-ui'

const validateParticipation = (_: unknown, value: number, cb: Function) => {
  if (value < 1) { return cb(new Error('Participation must be greater than 1')) }
  if (value > 100) { return cb(new Error('Participation must be smaller or equal to 100')) }
  cb()
}

export default Vue.extend({
  data: () => ({
    isValid: false,
    user: {
      firstName: '',
      lastName: '',
      participation: ''
    },
    rules: {
      firstName: [
        { required: true, message: 'First name is required!', trigger: 'blur' },
        { min: 3, message: 'Length must be bigger than 3', trigger: 'blur' }
      ],
      lastName: [
        { required: true, message: 'Last name is required!', trigger: 'blur' },
        { min: 3, message: 'Length must be bigger than 3', trigger: 'blur' }
      ],
      participation: [
        { required: true, message: 'Participation is required!', trigger: 'blur' },
        { type: 'number', message: 'Participation must be a number', trigger: 'blur' },
        { validator: validateParticipation, trigger: 'blur' }
      ]
    }
  }),

  methods: {
    validateForm () {
      const isEmpty = Object.values(this.$data.user).every(v => !v)
      !isEmpty && (this.$refs.userForm as Form).validate((valid: boolean) => {
        this.isValid = valid
      })
    },

    submitForm () {
      (this.$refs.userForm as Form).validate(async (valid: boolean) => {
        this.isValid = valid

        if (!valid) { return }
        try {
          await this.addUser(this.user)
        } catch (err) {
          this.$toast.error(err, {
            duration: 3000,
            position: 'bottom-center',
            theme: 'bubble',
            className: 'header__toast'
          })
        }

        this.resetForm()
        this.isValid = false
        return true
      })
    },

    resetForm () {
      (this.$refs.userForm as Form).resetFields()
    },

    ...mapActions(['addUser'])
  }
})
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    width: 70vw;

    .el-form {
      width: 100%;
    }

    &__button {
      background: none;
      color: white;
      font-weight: bold;
      width: 100%;

      &:hover, &:focus {
        background: #fffc;
      }
    }
  }

</style>

<style lang="scss">
  .header__form {
    .el-form-item__error {
      color: #fff;
      padding: 5px;
      background: #F56C6C;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 4px;
    }
  }

  .header__toast {
    font-weight: bold !important;
  }
</style>
