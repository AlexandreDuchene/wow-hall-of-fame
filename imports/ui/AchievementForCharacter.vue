<template>
    <v-card>
        <v-card-title class="mx-auto">
            <v-img :src="'img/achievement/' + achievement.img" max-height="36px" max-width="36px" class="mr-2 mb-2 d-inline-flex"></v-img>
            {{ $t(achievement.name) }}
        </v-card-title>
        <v-card-subtitle class="mt-1 pb-0">
            {{ $t('obtained-by') }}
            <v-img :src="'img/class/' + character.class.toLowerCase() + '.jpg'" max-height="1rem" max-width="1rem" class="ml-1 d-inline-flex"></v-img>
            {{ character.name + ' ' +  $t('the') + ' :' }}
        </v-card-subtitle>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="date of dates" link :href="settings.warcraftlogsUrl + 'reports/' + date.report" target="_blank">
                    <v-list-item-title class="mx-auto font-weight-black red--text text--darken-4">
                        {{ $d(date.date, 'short') }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: ['achievement', 'character', 'dates'],
    };
</script>
