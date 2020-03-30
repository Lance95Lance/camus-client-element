<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple" @click="addDialogVisible = true">
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
            <el-tag effect="dark">{{ val.project_title }}</el-tag>
            <div style="float: right;line-height: 30px;">
              <span>{{ val.created_person }}</span>
            </div>
          </div>

          <div>
            <el-popover placement="bottom-start" :content="val.project_detail" trigger="hover">
              <p class="title" slot="reference">{{ val.project_detail }}</p>
            </el-popover>
          </div>

          <div class="card-button">
            <el-button
              size="small"
              plain
              @click="modifyDialogVisible = true, padding_put_data(val)"
            >修改</el-button>
          </div>

          <!-- <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>-->
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增项目" width="400px" :visible.sync="addDialogVisible">
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
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject('addProjectForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改项目" width="400px" :visible.sync="modifyDialogVisible">
      <el-form
        :model="putProjectForm"
        status-icon
        ref="putProjectForm"
        label-position="left"
        class="putProjectForm"
        :rules="rules"
      >
        <el-form-item label="标题" prop="project_title">
          <el-input v-model="putProjectForm.project_title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="putProjectForm.project_detail" :rows="4"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyProject('putProjectForm')">确 定</el-button>
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
      putProjectForm: {
        project_title: '',
        project_detail: '',
        created_person: '',
        updated_person: '',
      },
      projectList: [],
      put_data : {},
      dialogVisible: false,
      rules: {
        project_title: [{ required: true, message: '请输入项目标题', trigger: 'blur' }],
      },
      valid_flag: false,
      addDialogVisible: false,
      modifyDialogVisible: false,
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
    valaid_form(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.valid_flag = true;
        } else {
          return false;
        }
      });
    },

    // 添加项目
    async addProject(formName) {
      if (this.valaid_form(formName) === false) {
        return;
      }

      if (this.valid_flag === true) {
        const result = await apis.postProject(this.addProjectForm);
        if (!result.success) {
          this.Notification('新增项目失败', result.message, 'warning');
        } else {
          this.addDialogVisible = false;
          this.Notification('新增项目成功', '执行成功', 'success');
          this.getProject();
        }
      }

      this.valid_flag = false;
    },
    //修改项目前填充原项目数据
    padding_put_data(val) {
      this.putProjectForm.project_title = val.project_title;
      this.putProjectForm.project_detail = val.project_detail;
      this.putProjectForm.created_person = val.created_person;
      this.putProjectForm.updated_person = 'camus';
      this.put_data = val;
    },

    //修改项目
    async modifyProject(formName) {
      if (this.valaid_form(formName) === false) {
        return;
      }

      if (this.valid_flag === true) {
        const result = await apis.putProject(this.put_data.id, this.putProjectForm);
        if (!result.success) {
          this.Notification('修改项目失败', result.message, 'warning');
        } else {
          this.modifyDialogVisible = false;
          this.Notification('修改项目成功', '执行成功', 'success');
          this.getProject();
        }
      }

      this.valid_flag = false;
    },
  },
};
</script>

<style scoped lang="less">
.text_item {
  text-align: center;
}

.box-card {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.box-card-header {
  height: 250px;
  margin-bottom: 20px;
  .el-card__body {
    padding: 20px;
  }
}

// .card-button {
//   position: relative;
//   top: 50px;
//   float: right;
// }

.card-button {
  margin-top: 90px;
  line-height: 12px;
  // margin: 90px;
  // position: relative;
  // bottom: 0px;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 0px;
  }
}

.title {
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 1;
  // overflow: hidden;
  // font-weight: bold;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .el-popover__reference {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
  }
}
</style>