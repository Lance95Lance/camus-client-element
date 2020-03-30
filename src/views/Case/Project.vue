<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple" @click="dialogVisible = true">
          <el-card class="box-card" shadow="hover">
            <div class="text_item">
              <p>+ 新增</p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8" v-for="(val, index) in projectList" :key="index">
        <el-card class="box-card-header" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ val.project_title }}</span>
          </div>
          <div class="text item">{{ val.project_detail }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增项目" width="400px" :visible.sync="dialogVisible">
      <el-form
        :model="addProjectForm"
        status-icon
        ref="addProjectForm"
        label-position="left"
        class="addProjectForm"
        :rules="rules"
      >
        <el-form-item label="标题" prop="project_title">
          <el-input v-model="addProjectForm.project_title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="addProjectForm.project_detail" :rows="4"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject('addProjectForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as apis from '../../services/apis';
import { format } from 'date-fns';

export default {
  data() {
    return {
      //     var validatePass = (rule, value, callback) => {
      //     if (value === '') {
      //       callback(new Error('请输入密码'));
      //     } else {
      //       if (this.ruleForm.checkPass !== '') {
      //         this.$refs.ruleForm.validateField('checkPass');
      //       }
      //       callback();
      //     }
      //   };
      addProjectForm: {
        project_title: '',
        project_detail: '',
        created_person: 'camus',
      },
      projectList: [],
      dialogVisible: false,
      rules: {
        project_title: [{ required: true, message: '请输入项目标题', trigger: 'blur' }],
      },
      valid_flag: false,
    };
  },

  async mounted() {
      this.getProject();
    // if (this.projectList.length > 0) {
    //   this.activeTab = this.$route.query.projectId || String(this.areaList[0].id);
    // }
  },
  methods: {
    async getProject() {
      const result = await apis.getProject();
      if (!result.success) return;
      this.projectList = result.data;
    },
    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async addProject(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.valid_flag = true;
        } else {
          return false;
        }
      });

      if (this.valid_flag === true) {
        const result = await apis.postProject(this.addProjectForm);
        if (!result.success) {
          this.Notification('新增项目失败', result.message, 'warning');
        } else {
          this.dialogVisible = false;
          this.Notification('新增项目成功', '执行成功', 'success');
          this.getProject();
        }
      }
    },
  },
};
</script>

<style scoped>
.text_item {
  text-align: center;
}

.box-card {
  height: 209px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.box-card-header {
  height: 209px;
  margin-bottom: 20px;
}
</style>