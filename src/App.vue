<template>
    <div class="fixed-header fixed-footerfi">
        <div id="app" class="section section-full">
            <div class="grid">
                <header class="section section-full navbar" role="header">
                    <div class="navbar-left">
                        <a href="/" class="btn btn-label">
                            <span class="text-nowrap text-big">Vue Project</span>
                        </a>
                    </div>
                    <div class="navbar-body">
                        <div class="navbar-menu right-x" area-labelledby="menu-main">
                            <router-link class="btn btn-link" :to="{ name: 'list'}" exact>Все товары</router-link>
                            <router-link class="btn btn-link" :to="{ name: 'add' }" exact>Добавить товар</router-link>
                        </div>
                    </div>
                </header>
                <div class="section" role="content">
                    <div class="grid">
                        <div class="cell width-x-12">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
                <footer></footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {name: 'app'}
</script>

<style>
    .navbar-menu a.active {
        font-weight: bold;
    }

  pre {
    margin-top: 20px;
		max-height: 300px;
		overflow-y: auto;
		text-align: left;
  }    
</style>