<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="searchSelectGroup">
        <el-form :inline="true" ref="searchform" :model="searchform">
          <el-form-item label="所属项目" prop="project_id">
            <el-select filterable v-model="searchform.project_id" clearable placeholder="请选择">
              <el-option
                v-for="item in caseConf.project_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用例等级" prop="case_priority">
            <el-select v-model="searchform.case_priority" clearable placeholder="请选择">
              <el-option
                v-for="item in caseConf.case_priority_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用例状态" prop="case_status">
            <el-select v-model="searchform.case_status" clearable placeholder="请选择">
              <el-option
                v-for="item in caseConf.case_status_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="bug" prop="case_bug">
            <el-select v-model="searchform.case_bug" clearable placeholder="请选择">
              <el-option
                v-for="item in caseConf.case_bug_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建者" prop="created_person">
            <el-select v-model="searchform.created_person" clearable placeholder="请选择">
              <el-option
                v-for="item in caseConf.user_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="buttonGroup">
            <el-form ref="searchform" :model="searchform" label-width="100px">
              <el-form-item>
                <!-- 搜索按钮 -->
                <el-button type="primary" icon="el-icon-search" circle @click="onSubmit"></el-button>
                <!-- 重置按钮 -->
                <el-button @click="resetForm('searchform')">重 置</el-button>
                <!-- 新增按钮 -->
                <el-button type="info" icon="el-icon-plus" plain @click="setDrawer('add')"></el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form>
      </div>

      <div>
        <!-- 抽屉 -->
        <el-col>
          <el-drawer title :visible.sync="drawer" direction="rtl" :show-close="false">
            <el-form ref="caseForm" :rules="rules" :model="caseForm" label-width="90px">
              <el-form-item :label="drawer_title"></el-form-item>
              <el-divider></el-divider>

              <el-row style="height: 60px;">
                <el-col :span="14">
                  <el-form-item label="所属项目" prop="project_id">
                    <el-select filterable v-model="caseForm.project_id" clearable placeholder="请选择">
                      <el-option
                        v-for="item in caseConf.project_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="height: 60px;">
                <el-col :span="14">
                  <el-form-item label="用例标题" prop="case_title">
                    <div>
                      <el-input placeholder="请输入用例标题" v-model="caseForm.case_title" clearable></el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="height: 60px;">
                <el-col :span="14">
                  <el-form-item label="用例等级" prop="case_priority_label">
                    <div>
                      <el-radio-group v-model="caseForm.case_priority_label">
                        <el-radio-button
                          v-for="item in caseConf.case_priority_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-radio-button>
                      </el-radio-group>
                    </div>

                    <!-- <el-select v-model="caseForm.case_priority" clearable placeholder="请选择">
                      <el-option
                        v-for="item in caseConf.case_priority_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>-->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="height: 60px;">
                <el-col>
                  <el-form-item label="用例状态" prop="case_status_label">
                    <div>
                      <el-radio-group v-model="caseForm.case_status_label">
                        <el-radio-button
                          v-for="item in caseConf.case_status_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-radio-button>
                      </el-radio-group>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="height: 60px;">
                <el-col>
                  <el-form-item label="用例详情" prop="case_detail">
                    <el-input type="textarea" v-model="caseForm.case_detail" :rows="4"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="height: 60px;">
                <el-col>
                  <el-form-item>
                    <el-button :loading="loading" @click="createCase('caseForm')">立即创建</el-button>
                    <el-button @click="drawer = false">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-drawer>
        </el-col>
      </div>
      <!-- <el-form ref="searchform" :model="searchform" label-width="100px"> -->

      <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)">
        <el-table-column prop="table_number" label="序号"></el-table-column>
        <!-- <el-table-column
        prop="case_priority"
        label="用例优先级">
        </el-table-column>-->

        <el-table-column prop="case_title" label="用例标题" width="500px">
          <template slot-scope="scope">
            <el-button
              type="text"
              slot="reference"
              @click="handleEdit(scope.$index, scope.row), dialogFormVisible = true"
            >{{scope.row.case_title}}</el-button>

            <el-dialog title="更新用例" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
              <el-form :model="putForm" :rules="rules" ref="putForm">
                <el-row style="height: 60px;">
                  <el-col :span="10">
                    <el-form-item label="用例等级" prop="case_priority_label" style="font-weight:bold">
                      <div>
                        <el-radio-group v-model="putForm.case_priority_label">
                          <el-radio-button
                            v-for="item in caseConf.case_priority_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-radio-button>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="用例标题" prop="case_title" style="font-weight:bold">
                  <div>
                    <el-input placeholder="请输入用例标题" v-model="putForm.case_title" clearable></el-input>
                  </div>
                </el-form-item>

                <el-form-item label="用例详情" prop="case_detail" style="font-weight:bold">
                  <div>
                    <el-input placeholder="请输入用例详情" type="textarea" :rows="10" v-model="putForm.case_detail"></el-input>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="putCase('putForm', scope.row)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column prop="case_detail" label="用例详情" width="500px"></el-table-column>

        <el-table-column prop="case_status" label="用例状态">
          <template slot-scope="scope">
            <div slot="reference" class="caseBug-wrapper">
              <div v-if="scope.row.case_status === '通过'">
                <el-tag size="medium" type="success">{{ scope.row.case_status }}</el-tag>
              </div>
              <div v-else-if="scope.row.case_status === '未执行'">
                <el-tag size="medium" type="info">{{ scope.row.case_status }}</el-tag>
              </div>
              <div v-else-if="scope.row.case_status === '挂起'">
                <el-tag size="medium" type="warning">{{ scope.row.case_status }}</el-tag>
              </div>
              <div v-else-if="scope.row.case_status === '阻塞'">
                <el-tag size="medium" type="danger">{{ scope.row.case_status }}</el-tag>
              </div>
              <div v-else>
                <el-tag size="medium" type="danger">{{scope.row.case_status}}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="case_bug" label="bug">
          <template slot-scope="scope">
            <div slot="reference" class="caseBug-wrapper">
              <div v-if="scope.row.case_bug === false">
                <el-tag size="medium" type="info">无</el-tag>
              </div>
              <div v-else>
                <el-tag size="medium" type="danger">有</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_person" label="创建者"></el-table-column>
        <el-table-column prop="updated_person" label="更新者"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-popover placement="top" width="150" trigger="click">
              <!-- <el-table :data="gridData">
                <el-table-column width="150" property="date" label="日期"></el-table-column>
                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                <el-table-column width="300" property="address" label="地址"></el-table-column>
              </el-table>-->

              <el-select v-model="putForm.case_status" clearable placeholder="请选择变更后用例状态">
                <el-option
                  v-for="item in caseConf.case_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <div>
                <br />
              </div>

              <el-select v-model="putForm.case_bug" clearable placeholder="请选择变更后bug状态">
                <el-option
                  v-for="item in caseConf.case_bug_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <div>
                <br />
              </div>
              <el-button type="primary" round @click="putChange(scope.row, 'simple')">确认</el-button>

              <el-button
                size="mini"
                slot="reference"
                @click="handleEdit(scope.$index, scope.row)"
              >变更</el-button>
            </el-popover>&thinsp;
            <el-popconfirm
              placement="top"
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-delete"
              iconColor="red"
              title="确认删除?"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button size="mini" slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-form> -->
      <br />
      <div class="pagination">
        <span class="demonstration"></span>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as apis from '../../services/apis';
import { format } from 'date-fns';

export default {
  data() {
    return {
      dialogFormVisible: false,

      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [7, 10, 50, 100],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      searchform: {
        case_priority: '',
        project_id: '',
        case_status: '',
        created_person: '',
        case_bug: '',
      },
      putForm: {
        case_title: '',
        case_detail: '',
        case_bug: '',
        case_status: '',
        case_status_label: '',
        case_priority: '',
        case_priority_label: '',
        updated_person: '',
        project_id: '',
      },
      caseConf: {
        case_priority_options: [],
        project_options: [],
        case_status_options: [],
        user_options: [],
        case_bug_options: [
          { value: false, label: '无' },
          { value: true, label: '有' },
        ],
      },
      tableData: [],
      case_conf: {},

      // 抽屉
      drawer: false,

      caseForm: {},
      rules: {
        project_id: [{ required: true, message: '请选择所属项目', trigger: 'change' }],
        case_title: [{ required: true, message: '请输入用例标题', trigger: 'change' }],
        case_priority_label: [{ required: true, message: '请选择用例优先级', trigger: 'change' }],
        case_status_label: [{ required: true, message: '请选择用例状态', trigger: 'change' }],
        case_detail: [{ required: true, message: '请输入用例详情', trigger: 'change' }],
      },
      drawer_title: '',
      timer: null,
      loading: false,
    };
  },
  methods: {
    setDrawer(val) {
      if (val === 'add') {
        this.drawer_title = '创建用例';
      } else if (val === 'modify') {
        this.drawer_title = '更新用例';
      }
      this.drawer = true;
    },
    async createCaseMethod() {
      const createCaseForm = {};

      //用例等级
      for (let enum_index in this.caseConf.case_priority_options) {
        if (
          this.caseConf.case_priority_options[enum_index].label ===
          this.caseForm.case_priority_label
        ) {
          createCaseForm.case_priority = this.caseConf.case_priority_options[enum_index].value;
        }
      }

      //用例状态
      for (let enum_index in this.caseConf.case_status_options) {
        if (
          this.caseConf.case_status_options[enum_index].label === this.caseForm.case_status_label
        ) {
          createCaseForm.case_status = this.caseConf.case_status_options[enum_index].value;
        }
      }

      createCaseForm.project_id = this.caseForm.project_id;
      createCaseForm.case_title = this.caseForm.case_title;
      createCaseForm.case_detail = this.caseForm.case_detail;
      createCaseForm.created_person = 'camus';

      this.loading = true;
      const result = await apis.postCreateCase(createCaseForm);
      if (!result.success) {
        this.Notification('创建失败', result.message, 'error');
      } else {
        this.Notification('已创建', '执行成功', 'success');
      }
      this.loading = false;
    },
    createCase(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createCaseMethod();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    putCase(formName, row) {
      //用例等级
      for (let enum_index in this.caseConf.case_priority_options) {
        if (
          this.caseConf.case_priority_options[enum_index].label ===
          this.putForm.case_priority_label
        ) {
          this.putForm.case_priority = this.caseConf.case_priority_options[enum_index].value;
        }
      }
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.putChange();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancelForm() {
      this.loading = false;
      this.drawer = false;
      clearTimeout(this.timer);
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'white-space: pre-line';
    },
    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },
    async searchCase() {
      let search_form_data = {};
      for (let index in this.searchform) {
        if (this.searchform[index] !== '') {
          search_form_data[index] = this.searchform[index];
        }
      }

      this.tableData = [];

      const CASE_RESULT = await apis.postSearchCase(search_form_data);
      const CASE_INFO_DATA = CASE_RESULT.data;

      // 用例信息
      // 表格序号计数(非接口返回序号)
      let table_number = 0;
      for (let index in CASE_INFO_DATA) {
        table_number = table_number + 1;
        this.tableData.push({
          table_number: table_number,
          id: CASE_INFO_DATA[index].id,
          case_title: CASE_INFO_DATA[index].case_title,
          case_detail: CASE_INFO_DATA[index].case_detail,
          project_id: CASE_INFO_DATA[index].project_id,
          case_priority: this.case_conf.case_priority[CASE_INFO_DATA[index].case_priority],
          case_priority_key: CASE_INFO_DATA[index].case_priority,
          case_status: this.case_conf.case_status[CASE_INFO_DATA[index].case_status],
          case_status_key: CASE_INFO_DATA[index].case_status,
          case_bug: CASE_INFO_DATA[index].case_bug || false,
          created_person: CASE_INFO_DATA[index].created_person,
          updated_person: CASE_INFO_DATA[index].updated_person,
        });
      }
      this.totalCount = this.tableData.length;
    },
    async onSubmit() {
      await this.searchCase();
      this.$message(`查询成功, 总共${this.totalCount}条用例`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning',
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 改变默认的页数
      this.currentPage = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.putForm.case_status = row.case_status_key;
      this.putForm.case_status_label = row.case_status;
      this.putForm.case_priority = row.case_priority_key;
      this.putForm.case_priority_label = row.case_priority;
      this.putForm.case_bug = row.case_bug;
      this.putForm.updated_person = 'camus';
      this.putForm.id = row.id;
      this.putForm.project_id = row.project_id;
      this.putForm.case_title = row.case_title;
      this.putForm.case_detail = row.case_detail;
      this.putForm.created_person = row.created_person;
      console.log(this.putForm);
    },
    async putChange(row, type = 'basic') {
      let case_id = 0;
      if (type === 'simple') {
        case_id = row.id;
      } else {
        case_id = this.putForm.id;
      }

      const result = await apis.putSimpleChangeCase(case_id, this.putForm);
      if (!result.success) {
        this.Notification('变更失败', result.message, 'error');
      } else {
        this.Notification('已变更', '执行成功', 'success');
        this.searchCase();
        this.dialogFormVisible = false;
      }
    },
    async handleDelete(index, row) {
      const result = await apis.deleteCase(row.id);
      if (!result.success) {
        this.Notification('删除失败', result.message, 'error');
      } else {
        this.Notification('已删除', '执行成功', 'success');
        this.searchCase();
      }
    },
  },
  async mounted() {
    const BASE_CASE_RESULT = await apis.getCaseConf();
    const BASE_CASE_CONF = BASE_CASE_RESULT.data;
    this.case_conf = BASE_CASE_CONF;

    //用例等级
    for (let enum_index in BASE_CASE_CONF.case_priority) {
      this.caseConf.case_priority_options.push({
        value: enum_index,
        label: BASE_CASE_CONF.case_priority[enum_index],
      });
    }

    //用例状态
    for (let enum_index in BASE_CASE_CONF.case_status) {
      this.caseConf.case_status_options.push({
        value: enum_index,
        label: BASE_CASE_CONF.case_status[enum_index],
      });
    }

    const PROJECT_INFO_RESULT = await apis.getAllProject();
    const PROJECT_INFO_DATA = PROJECT_INFO_RESULT.data;

    //所属项目
    for (let index in PROJECT_INFO_DATA) {
      this.caseConf.project_options.push({
        value: PROJECT_INFO_DATA[index].id,
        label: PROJECT_INFO_DATA[index].name,
      });
    }

    const USER_RESULT = await apis.getAllUser();
    const USER_INFO_DATA = USER_RESULT.data;

    //创建者
    for (let index in USER_INFO_DATA) {
      this.caseConf.user_options.push({
        value: USER_INFO_DATA[index].username,
        label: USER_INFO_DATA[index].username,
      });
    }

    this.searchCase();

    // const CASE_RESULT = await apis.getAllCase();
    // const CASE_INFO_DATA = CASE_RESULT.data;

    // this.tableData = [];

    // // 用例信息
    // // 表格序号计数(非接口返回序号)
    // let table_number = 0;
    // for (let index in CASE_INFO_DATA) {
    //   table_number = table_number + 1;
    //   this.tableData.push({
    //     table_number: table_number,
    //     id: CASE_INFO_DATA[index].id,
    //     project_id: CASE_INFO_DATA[index].project_id,
    //     case_title: CASE_INFO_DATA[index].case_title,
    //     case_priority: BASE_CASE_CONF.case_priority[CASE_INFO_DATA[index].case_priority],
    //     case_priority_key: CASE_INFO_DATA[index].case_priority,
    //     case_status: BASE_CASE_CONF.case_status[CASE_INFO_DATA[index].case_status],
    //     case_status_key: CASE_INFO_DATA[index].case_status,
    //     case_bug: CASE_INFO_DATA[index].case_bug || false,
    //     created_person: CASE_INFO_DATA[index].created_person,
    //     updated_person: CASE_INFO_DATA[index].updated_person,
    //   });
    // }
    // this.totalCount = this.tableData.length;
  },
};
</script>

<style  lang="less">
.line {
  text-align: center;
}
.pagination {
  text-align: right;
}
.buttonGroup {
  text-align: right;
}
.searchSelectGroup {
  text-align: right;
}

/*实现表格头数据换行*/
/* .el-table .cell {
    white-space: pre-line;
} */
</style>
