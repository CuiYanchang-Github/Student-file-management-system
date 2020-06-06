<template>
    <div id="App">
        <router-view />
    </div>
</template>


<style lang="scss">
body {
    margin: 0;
}

//消除google浏览器黄色框
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    box-shadow: 0 0 0 60px #ffffff inset;
    -webkit-text-fill-color: #40526f;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px transparent;
    border-radius: 3px;
    background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c4cfdd;
}

html {
    height: 100%;
    body {
        margin: 0;
        height: 100%;
        #App {
            display: flex;
            align-items: stretch;
            width: 100%;
            height: 100%;
            font-family: PingFang SC;
            .el-input.is-disabled .el-input__inner {
                color: #000000;
            }
        }
    }
}

.danger.el-button--text {
    span {
        color: red;
    }
}
</style>

