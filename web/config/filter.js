'use strict';
import Vue from "vue";

export const ratingTypeOptions = [
	{label: "分数", value: 1},
	{label: "ABCD等级", value: 2},
	{label: "不及格|及格|中等|良好|优秀", value: 3}
]

Vue.filter("formatRole", (value) => {
	switch(value) {
		case "TEACHER": return "教师";
		case "STUDENT": return "学生";
	}
});