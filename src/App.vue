<template lang="pug">
  el-container#app
    el-aside(:width='collapsed ? `64` : `200`')
      div.logo(v-if='!collapsed')
        span 质 量 工 具
      div.logo.small-logo(v-else)
        span 质
      el-menu.nav(:default-openeds='openNames',
        background-color='#001529',
        text-color='#ffffff',
        :collapse="collapsed")
        el-submenu(v-for='(value, index) in MenuConfig',
          :key='index',
          :index='value.id')
          template.group(slot='title')
            i(:class='[ value.icon ]')
            span {{value.label}}
          el-menu-item(v-for='(val, ind) in value.children',
            :key='ind',
            :index='val.id')
            div(@click='changeMenu(val)') {{val.label}}
    el-container
      el-header.bar
        div(:class="{'sider-trigger': true, 'small-sider': collapsed}",
          @click='toggleCollapsed')
          i.el-icon-menu
        div.title
          el-breadcrumb(separator='/')
            el-breadcrumb-item(v-for='(val, index) in breadCrumb',
              :key='index'
              :to="{ path: val.path }") {{val.label}}
        //- div.coverage-onsi
        //-   a(href='http://10.110.1.103/coverage/onsi') 覆盖率平台
        //- div.logout
        //-   a(href='#', @click.prevent='logout') 退出

      el-main
        router-view.main
</template>

<script>
import MenuConfig from './config/menu';
import { mapActions, mapState } from 'vuex';
import * as apis from './services/apis';

export default {
  data() {
    return {
      MenuConfig,
      collapsed: false,
    };
  },
  name: 'app',
  computed: {
    ...mapState({
      breadCrumb: state => state.common.breadCrumb,
    }),
    openNames() {
      return MenuConfig.map(item => item.id);
    },
  },
  methods: {
    ...mapActions(['setCurrentMenu', 'setCurrentTitle', 'routePush']),

    notificationQtps() {
        this.$notify({
          title: '欢迎进入质量工具平台',
          dangerouslyUseHTMLString: true,
          message: '有任何问题请 <b>@刘昌肇</b>',
          type: 'success',
          // position: 'bottom-right'
      });
    },

    changeMenu(menu) {
      this.setCurrentMenu(menu);
      this.routePush({ path: menu.url });
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    async logout() {
      const result = await apis.getLogOutInfo();
      window.location.href = result.data;
    },
  },
  mounted() {
    this.setCurrentTitle(this.$route.meta.title);
    this.$router.beforeEach((to, before, next) => {
      if (to.path !== before.path) this.setCurrentTitle(to.meta.title);
      next();
    });
    this.notificationQtps();
  },
};
</script>

<style lang="less">
@navBgColor: #001529;
@thumbColor: #2d8cf0;
@headerHeight: 80px;
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
* {
  font-family: '微软雅黑';
}
p {
  margin-top: 0;
  margin-bottom: 0;
}
#app {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  .aside {
    width: 200px;
  }
  .caside {
    width: 64px;
  }
  .el-aside {
    background-color: @navBgColor;
    .logo {
      width: 200px;
      height: @headerHeight;
      color: #fff;
      line-height: 70px;
      text-align: center;
      font-size: 18px;
      transition: all 0.3s ease-in-out;
      span {
        padding: 10px 15px;
        background-color: @thumbColor;
        border-radius: 7px 7px 7px 0;
      }
    }
    .small-logo {
      width: 64px;
      transition: all 0.3s ease-in-out;
      span {
        padding: 0;
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: @thumbColor;
        border-radius: 50%;
      }
    }
    .nav {
      border-right: none;
    }

    .nav:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    .sider-trigger {
      margin-right: 30px;
      text-align: center;
    }
    .el-icon-menu {
      font-size: 18px;
    }
    .small-sider {
      transform: rotateZ(-90deg);
      transition: all 0.3s ease-in-out;
    }
    .title {
      font-size: 16px;
      cursor: pointer;
      flex: 1;
    }
    .coverage-onsi {
      width: 100px;
      text-align: right;
      a {
        font-size: 14px;
        color: #2d8cf0;
        text-decoration: none;
      }
    }
    .logout {
      width: 50px;
      text-align: right;
      a {
        font-size: 14px;
        color: #2d8cf0;
        text-decoration: none;
      }
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-dialog__body {
    padding: 15px 20px;
  }
  .el-table {
    th,
    td {
      text-align: center;
    }
    .cell {
      padding-left: 3px;
      padding-right: 3px;
    }
  }
}
</style>
