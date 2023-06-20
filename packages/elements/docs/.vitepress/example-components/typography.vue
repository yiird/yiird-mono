<template>
    <y-typography>
        <y-title align="center">存款利率一降再降，买房收租和存银行哪个更划算？</y-title>

        <y-paragraph>购房者主要看重房产本身的增值空间，对此期待值是大于收租的。</y-paragraph>

        <y-paragraph>“降息潮”蔓延，继六大行下调存款利率后，12家股份制银行也陆续下调人民币存款利率。</y-paragraph>

        <y-paragraph>
            近日，各家股份制银行调整存款利率，调整后活期存款年化利率为0.2%，与六大银行持平，其他各档定期存款利率大部分略高于六大银行，二年期、三年期、五年期定期存款利率下调幅度相对较大，五年期整存整取挂牌利率最高为2.8%。
        </y-paragraph>

        <y-paragraph>
            面对存款利率下调，如何做好资产多元化配置，成为储户及投资者关心的话题，从存款、理财、保险、基金，到购置房产自住或收租，哪种方式更能平衡风险和收益？
        </y-paragraph>

        <y-paragraph>
            业内机构认为，存款利率下调，对储户的吸引力减弱，“存款搬家”现象或将强化，个人有可能将存款资金转移至消费投资等活动，银行理财等低风险资管产品或将迎来增量资金。此外，从部分城市的租金收益率看，存款利率下调对居民买房收租的意愿或有一定刺激作用。
        </y-paragraph>

        <y-title
            :level="2"
            :ellipsis="{ length: 10 }">
            长期限存款利率下调显著
        </y-title>

        <y-paragraph>本次银行“降息潮”始于国有六大行。6月8日，六大行先后更新人民币存款挂牌利率情况，活期、定期存款利率均有所下调，中长期定期存款下调幅度更大。</y-paragraph>

        <y-paragraph>
            近日，一条关于广州保利天汇公寓的投资收益的朋友圈在网络上受到关注，该条朋友圈内容显示，该公寓产权50年，带装修交付，按照总价60万元，月租金2500元计算，每年的租金回报是3万元，每年的投资回报率即能达到5%，而当前银行的固定存款利息仅2.75%。
        </y-paragraph>

        <y-paragraph :ellipsis="ellipsis">
            <y-text code>广州市</y-text>
            一名房产中介向第
            <y-text code>一财经</y-text>
            证实了上述信息的真实性，他表示，保利天汇公寓位于广州市天河区天河智慧城附近，单价3万元/平方米左右，面积大小21平方米，交房之后租金能达到2500元/月，如果非全款购买，最低首付可以低至6万元，剩下的贷款利率为4.9%。值得注意的是，记者翻看租房平台发现，同片区内，比保利天汇面积更大，距离地铁更近的不少房源租金不及2500元/月，而上述5%的投资回报率也存疑。
        </y-paragraph>

        <y-paragraph :indent="0">
            <y-text delete>测试文本（删除线）</y-text>
            <br />
            <y-text underline>测试文本（下滑线）</y-text>
            <br />
            <y-text code>测试文本（代码标记）</y-text>
            <br />
            <y-text strong>测试文本（加粗）</y-text>
            <br />
            <y-text italic>测试文本（斜体）</y-text>
            <br />
            <y-text mark>测试文本（标记）</y-text>
            <br />
        </y-paragraph>
    </y-typography>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ellipsis = ref({ rows: 2, suffix: '...', expandText: '展开' });

/* setTimeout(()=>{
    ellipsis.value.rows = 3
    console.log('ellipsis')
},2000) */
</script>

<style scoped></style>
