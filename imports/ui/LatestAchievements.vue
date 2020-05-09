<template>
    <v-card>
        <v-card-title class="pb-0">
            {{ $t('latestAchievements') }}
        </v-card-title>
        <v-list>
            <v-list-item v-for="achievement in achievements" link :href="settings.warcraftlogsUrl + 'reports/' + achievement.characters[0].dates[0].report" target="_blank">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-list-item-content v-on="on">
                                <v-img :src="'/img/achievement/' + achievement.img " max-height="1rem" max-width="1rem" class="mr-1"></v-img>
                                {{ $t(achievement.name) + ' ' + $t('obtained-by').toLowerCase() }}
                                <v-img :src="'img/class/' + achievement.characters[0].class.toLowerCase() + '.jpg'" max-height="1rem" max-width="1rem" class="ml-1 mr-1"></v-img>
                                {{ achievement.characters[0].name + ' ' +  $t('the') + ' ' + $d(achievement.characters[0].dates[0].date, 'short') }}
                            </v-list-item-content>
                        </template>
                        <span>{{ $t(achievement.description) }}</span>
                    </v-tooltip>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    import { Achievement } from "../../client/main";

    export default {
        meteor: {
            $subscribe: {
                'achievements': [],
            },
            achievements() {
                return Achievement.find(
                    {
                        'characters.name': {$exists: true}
                    },
                    {
                        sort: {'characters.dates.date': -1},
                        transform: function(achievement) {
                            achievement.characters.sort(function(a, b) {
                                return a.dates[0].date > b.dates[0].date ? -1 : 1;
                            });

                            return achievement;
                        }
                    }
                ).fetch();
            },
        }
    };
</script>
