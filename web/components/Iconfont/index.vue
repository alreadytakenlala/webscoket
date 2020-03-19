<template>
	<view class="iconfont_view-box" @click="click">
		<svg class="icon" aria-hidden="true" :style="`font-size:${size}rpx;color:${color.length && color[0]}`">
		    <use :href="`#${name}`" />
		</svg>
	</view>
</template>

<script>
	"use scrict";
	
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			size: {
				type: Number,
				default: 66
			},
			color: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		methods: {
			click: function () {
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss">
	.iconfont_view-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
