<template>
    <!-- App.vue -->

    <v-app>
        <v-app-bar app>
            <v-row align="center">
                <v-img src="img/logo.png" max-height="60px" max-width="60px"></v-img>
                <h1 class="font-weight-black red--text text--darken-4">OVERLOAD - HALL OF FAME</h1>
            </v-row>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <v-expansion-panels multiple hover focusable accordion>
                    <v-expansion-panel v-for="achievement of achievements">
                        <v-expansion-panel-header>
                            <v-list-item>
                                <v-list-item-icon >
                                    <v-img :src="'img/achievement/' + achievement.img " max-height="36px" max-width="36px"></v-img>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-badge v-if="achievement.count > 0" inline color="red" :content="achievement.count">
                                            {{ $t(achievement.name) }}
                                        </v-badge>
                                        <span v-else>
                                            {{ $t(achievement.name) }}
                                        </span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ $t(achievement.description) }}.
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <v-list>
                                <v-list-item v-for="character of achievement.characters">
                                    <v-list-item-content>
                                        <v-dialog  scrollable max-width="300px">
                                            <template v-slot:activator="{ on }">
                                                <v-list-item-title v-on="on">
                                                    <v-badge  inline color="red" :content="character.count">
                                                        <v-img :src="'img/class/' + character.class.toLowerCase() + '.jpg'" max-height="20px" max-width="20px" class="mr-2"></v-img>
                                                        {{ character.name }}
                                                    </v-badge>
                                                </v-list-item-title>
                                                </template>
                                                <v-card>
                                                    <v-card-title>
                                                        <v-img :src="'img/achievement/' + achievement.img " max-height="36px" max-width="36px" class="mr-2 mb-2"></v-img>
                                                        {{ $t(achievement.name) }} - {{ character.name }}
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-list-item v-for="date of character.dates">
                                                            <v-list-item-title>
                                                                <a target="_blank" rel="noopener noreferrer" :href="settings.warcraftlogsUrl + '/reports/' + date.report"> {{ $d(date.date, 'short') }}</a>
                                                            </v-list-item-title>
                                                        </v-list-item>
                                                    </v-card-text>
                                                </v-card>
                                            </v-dialog>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-container>
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
</script>
