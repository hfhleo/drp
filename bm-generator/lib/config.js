import expose from './expose'

export default {
    host: expose.HOST,

    metaTypes: {
        page: 0,
    },

    dataTypes: {
        string: '文本',
        number: '数字',
        boolean: '布尔值',
        array: '数组',
    },

    dateTypes: {
        date: '日期',
        week: '周数',
        month: '月份',
    },

    daterangeShortcuts: {
        today: '今天',
        yesterday: '昨天',
        // day: '最近一天',
        week: '最近7天',
        twoWeek: '最近14天',
        month: '最近30天',
        year: '最近365天',
    },
    daterangeShortcutsRange: {
        prevRange: '上一时间段',
        prevYearRange: '去年同期'
    },

    dateDisabledDateTypes: [
        { label: '无', value: '' },
        { label: '今天之前', value: 'beforeToday' },
        { label: '今天之后', value: 'afterToday' },
    ],

    fieldTypes: {
        text: '输入框',
        // hidden: '隐藏值',
        textarea: '多行文本',
        dropdown: '下拉框',
        date: '日期',
        // datetime: '日期时间',
        daterange: '日期区间',
        // datetimerange: '日期时间区间',
        // cascader: '级联菜单',
        // color: '颜色',
        // switch: '开关',
        // 'search-input': '搜索输入',
        // autocomplete: '输入建议',
        // 'checkbox-group': '多选框组',
        // 'radio-group': '单选框组',
        // upload: '上传文件',
        // 'rich-text': '富文本',
        // custom: '自定义',
        // password: '密码',
        // raw: '文本显示',
        // image: '图片',
        // enum: '枚举',
        // 'text-list': '文本列表',
        // 'table-column-hidden': '数据列表列隐藏控制',
        // 'other-component': '外部组件',
    },

    buttonTypes: {
        reset: '重置',
        search: '搜索',
        export: '导出报表',
        link: '外部链接',
        router: '内部链接',
        dialog: '对话框',
        confirm: '确认框',
        close: '关闭',
        request: '异步请求',
        iframe: 'iframe',
    },

    buttonTargetTypes: {
        _self: '本页面打开',
        _blank: '新页面打开',
    },

    dialogStatus: {
        add: '新增',
        edit: '编辑',
        view: '查看',
        // disabled: '禁用编辑',
    },

    dialogTypes: {
        default: '默认',
        template: '个性化模板',
    },

    paginationLayout: {
        total: '总数',
        sizes: '分页数量',
        prev: '上一页',
        pager: '页码',
        next: '下一页',
        jumper: '跳转',
    },

    columnTypes: {
        raw: '文本',
        number: '数字',
        float: '两位小数',
        integer: '整数',
        // index: '序号',
        percent: '百分比',
        money: '金额',
        enum: '枚举',
        time: '时间',
        computed: '计算值',
        // link: '外部链接',
        // router: '内部链接',
        // inner: '内部操作链接',
        // image: '图片',
        // sort: '排序',
    },

    dialogSizeTypes: {
        tiny: '小',
        small: '中',
        large: '大',
        full: '全屏',
    },

    ruleTypes: {
        string: '文本',
        number: '数字',
        integer: '整数',
        float: '浮点数',
        date: '日期',
    },

    chartCompareDayMap: {
        today: '当日',
        yesterday: '上一天',
        last_week: '上一周',
    },

    colors: [
        ['#FF0033', '#8E8B82', '#86A6DF'],
        ['#00C3FF', '#466551', '#693E52'],
        ['#9933CC', '#E4C478', '#AAAAAA'],
        ['#4ED99C', '#A44A4A', '#362391'],
        ['#FEED30', '#88A9F7', '#E5E5E5'],
        ['#FF33CC', '#849561', '#393E46'],
        ['#0099FF', '#C46CAA', '#394359'],
        ['#E9007F', '#AD8C45', '#406661'],
        ['#1FFFFF', '#8E2735', '#61529F'],
    ],

    aggregate: ['count', 'sum', 'avg', 'max', 'min'],

    FSTAT_TIME_COLUMN: {
        label: '日期',
        name: 'FSTAT_TIME',
        custom: {
            dataType: 'time',
            format: 'yyyy-MM-dd',
        },
    },

    ignoreColumns: ['FCREATOR', 'FCREATE', 'FMODIFIER', 'FMODIFY'],

    pageActions: [{
        label: '查询',
        value: 'search',
        url: '/manage/page/query',
    }, {
        label: '合计',
        value: 'search-summary',
        url: '/manage/page/summary',
    }, {
        label: '导出',
        value: 'export',
        url: '/manage/page/export',
    }, {
        label: '分日导出',
        value: 'export-day',
        url: '/manage/page/export',
    }, {
        label: '新增',
        value: 'add',
        url: '/manage/page/add',
    }],

    tableActions: [{
        label: '更新',
        value: 'update',
        url: '/manage/page/update',
    }, {
        label: '复制',
        value: 'copy',
        url: '/manage/page/add',
    }, {
        label: '详情',
        value: 'detail',
        url: '/manage/page/query',
    }, {
        label: '删除',
        value: 'delete',
        url: '/manage/page/delete',
    }],

    customActionTypes: [{
        label: '跳转',
        value: 'router'
    }, {
        label: '弹框页面',
        value: 'iframeDialog'
    }],

    setting: {
        data: {
            sources: [],
            columns: [],
        },
        view: {
            pageActions: [],
            tableActions: [],
            customPageActions: [],
            customTableActions: [],
        },
    },

    chartOptions: {
        legend: {
            data: [],
            selected: {}
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            type: 'value',
        },
        series: [],
    },

    setup: {
        page: {
            title: '',
            url: '',
            css: '',
            navs: [],
        },

        searchForm: {
            title: '搜索',
            labelWidth: '120px',
            immediate: true,
            urls: {
                list: {},
                chart: {},
                total: {},
                summary: {},
            },
            fields: [],
			buttons: [],
			cascaderGroup: [
				['FMEDIANEW', 'FMODULE', 'FPOSITIONNEW'],
			]
        },
        chart: {
            yAxisFormatter: '{value}',
            title: '',
            xAxisKey: {
                key: '',
                options: '',
            },
            seriesKeys: [],
            resultData: [],
            compare: {
                key: '',
                day: [],
            },
            options: {
                legend: {
                    data: [],
                    selected: {}
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                },
                yAxis: {
                    type: 'value',
                },
                series: [],
            },
        },
        dataTable: {
            title: '数据列表',
            loading: false,
            data: [],
            total: 0,
            summary: {},
            supportSort: false,
            defaultSort: {
                prop: '',
                order: 'ascending',
            },
            useLocalSort: false,
            useLocalPagination: false,
            summaryPosition: 'last',
            columns: [],
            columnsFilter: '',
            operations: {
                show: false,
                title: '操作',
                width: '',
                align: 'center',
                buttons: [],
            },
            batch: {
                show: false,
                params: '',
                selectable: '',
                buttons: [],
            },
            sortUrls: {
                up: {},
                down: {},
                jump: {},
            },
            pagination: {
                show: true,
                sizes: [10, 20, 50, 100],
                layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
                currentPage: 1,
                pageSize: 20,
                maps: {
                    page: {
                        type: 'map',
                        key: 'start',
                        filter: 'return (page.curr - 1) * page.size;',
                    },
                    size: {
                        type: 'map',
                        key: 'max',
                        filter: '',
                    },
                },
            },
        },

        dialogs: {},
    },
}