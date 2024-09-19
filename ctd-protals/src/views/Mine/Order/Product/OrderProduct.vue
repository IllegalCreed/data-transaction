<template>
  <div class="order-page" flex flex-col gap-4>
    <!-- 标题 -->
    <h2 class="text-2xl font-bold">数据产品订单</h2>

    <!-- 搜索和筛选区域 -->
    <div class="search-filter" flex flex-col md:flex-row gap-4 items-center>
      <!-- 搜索框 -->
      <el-input
        v-model="searchQuery"
        placeholder="搜索订单"
        class="w-full md:w-1/3"
        clearable
        @clear="fetchOrders"
        @keyup.enter="fetchOrders"
      >
        <template #append>
          <el-button icon="i-ep:search" @click="fetchOrders"></el-button>
        </template>
      </el-input>

      <!-- 状态筛选 -->
      <el-select
        v-model="selectedStatus"
        placeholder="选择订单状态"
        class="w-full md:w-1/4"
        @change="fetchOrders"
      >
        <el-option
          v-for="status in orderStatuses"
          :key="status.value"
          :label="status.label"
          :value="status.value"
        />
      </el-select>
    </div>

    <!-- 订单列表 -->
    <div class="order-list" flex flex-col gap-4>
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card p-4 border rounded bg-white shadow-sm"
      >
        <div class="order-header flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ order.productName }}</h3>
          <span class="text-sm text-gray-500">{{ formatDate(order.purchaseDate) }}</span>
        </div>
        <div class="order-body mt-2">
          <div><strong>价格：</strong>{{ order.price }}</div>
          <div><strong>状态：</strong>{{ formatStatus(order.status) }}</div>
          <div v-if="order.status === 'to_deliver'">
            <strong>预计交付时间：</strong>{{ order.expectedDeliveryDate }}
          </div>
          <div v-else-if="order.status === 'to_check'">
            <strong>实际交付时间：</strong>{{ order.actualDeliveryDate }}
          </div>
        </div>
        <div class="order-actions mt-4 flex gap-2">
          <el-button size="small" @click="viewDetails(order)">查看详情</el-button>
          <el-button
            v-if="order.status === 'contract'"
            size="small"
            type="primary"
            @click="signContract(order)"
          >
            签署合同
          </el-button>
          <el-button
            v-else-if="order.status === 'to_deliver'"
            size="small"
            type="success"
            @click="confirmDelivery(order)"
          >
            确认交付
          </el-button>
          <el-button
            v-else-if="order.status === 'pending_review'"
            size="small"
            type="warning"
            @click="reviewOrder(order)"
          >
            评价订单
          </el-button>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      v-if="totalOrders > pageSize"
      :pager-count="pagerCount"
      :background="showPaginationBackground"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalOrders"
      :layout="paginationLayout"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
interface Order {
  id: number
  productName: string
  purchaseDate: string
  price: string
  status: string
  expectedDeliveryDate?: string
  actualDeliveryDate?: string
}

const searchQuery = ref('')
const selectedStatus = ref('')
const orders = ref<Order[]>([])
const isLoading = ref(false)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalOrders = ref(0)

// 状态列表
const orderStatuses = ref([
  { value: '', label: '全部状态' },
  { value: 'pending', label: '待审核' },
  { value: 'contract', label: '合同协商' },
  { value: 'to_deliver', label: '待交付' },
  { value: 'to_check', label: '待验查' },
  { value: 'pending_review', label: '待评价' },
  { value: 'reviewed', label: '已评价' }
])

// 分页组件设置
const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})

// 获取订单列表
const fetchOrders = async () => {
  isLoading.value = true
  // 模拟 API 请求
  setTimeout(() => {
    // 模拟的订单数据
    const allOrders: Order[] = [
      {
        id: 1,
        productName: '数据产品 A',
        purchaseDate: '2023-09-18',
        price: '¥200',
        status: 'contract',
        expectedDeliveryDate: '2023-09-25'
      }
      // ... 更多订单数据
    ]

    // 筛选和分页逻辑
    let filteredOrders = allOrders.filter((order) => {
      const matchesQuery = !searchQuery.value || order.productName.includes(searchQuery.value)
      const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
      return matchesQuery && matchesStatus
    })

    totalOrders.value = filteredOrders.length

    // 分页
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    orders.value = filteredOrders.slice(start, end)

    isLoading.value = false
  }, 500)
}

// 初始化获取订单
onMounted(() => {
  fetchOrders()
})

// 分页改变时
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchOrders()
}

// 格式化日期
const formatDate = (dateStr: string) => {
  return dayjs(dateStr).format('YYYY-MM-DD')
}

// 格式化状态
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待审核',
    contract: '合同协商',
    to_deliver: '待交付',
    to_check: '待验查',
    pending_review: '待评价',
    reviewed: '已评价'
  }
  return statusMap[status] || '未知状态'
}

// 操作按钮的方法
const viewDetails = (order: Order) => {
  // 查看订单详情逻辑
  console.log('查看详情', order)
}

const signContract = (order: Order) => {
  // 签署合同逻辑
  console.log('签署合同', order)
}

const confirmDelivery = (order: Order) => {
  // 确认交付逻辑
  console.log('确认交付', order)
}

const reviewOrder = (order: Order) => {
  // 评价订单逻辑
  console.log('评价订单', order)
}
</script>

<style lang="scss" scoped>
.order-page {
  @apply p-6 md:p-10;

  .search-filter {
    @apply w-full gap-4;

    @media (max-width: 768px) {
      @apply flex-col;
    }
  }

  .order-list {
    @apply flex flex-col gap-4;

    .order-card {
      @apply p-4 border border-solid border-gray-200 rounded bg-white shadow-sm;

      .order-header {
        @apply flex justify-between items-center;

        h3 {
          @apply text-lg font-semibold;
        }

        span {
          @apply text-sm text-gray-500;
        }
      }

      .order-body {
        @apply mt-2;

        div {
          @apply mb-1;
        }
      }

      .order-actions {
        @apply mt-4 flex flex-wrap gap-2;
      }
    }
  }

  /* 适配移动设备 */
  @media (max-width: 640px) {
    .order-card {
      .order-header h3 {
        @apply text-base;
      }

      .order-actions .el-button {
        @apply text-xs;
      }
    }
  }
}
</style>
