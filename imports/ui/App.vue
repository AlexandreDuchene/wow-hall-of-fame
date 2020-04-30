<template>
    <v-app>
        <v-app-bar app dense>
            <v-img src="img/logo.png" max-height="45px" max-width="45px"></v-img>
            <v-toolbar-title class="font-weight-black red--text text--darken-4 text-uppercase">
                {{ settings.guildName }} - HALL OF FAME
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon color="red darken-4" @click="drawer = true">
                <v-icon>mdi-cog</v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer"fixed temporary right>
            <v-list nav dense>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-switch id="switch-theme" @change="setTheme" color="red darken-4"></v-switch>
                    </v-list-item-avatar>
                    <v-list-item-title class="font-weight-black red--text text--darken-4">
                        <label for="switch-theme">{{ $t('dark-theme') }}</label>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-avatar>
                        <a target="_blank" rel="noopener noreferrer" class="font-weight-black red--text text--darken-4" :href="settings.warcraftlogsUrl + '/guild/' + settings.region + '/' + settings.server + '/' + settings.guildName">
                            <v-img src="img/warcraftlogs.png" max-height="35px" max-width="35px" ></v-img>
                        </a>
                    </v-list-item-avatar>
                    <v-list-item-title>
                        <a target="_blank" rel="noopener noreferrer" class="font-weight-black red--text text--darken-4" :href="settings.warcraftlogsUrl + '/guild/' + settings.region + '/' + settings.server + '/' + settings.guildName">Warcraftlogs</a>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid>
                <v-expansion-panels multiple hover focusable accordion>
                    <v-expansion-panel v-for="achievement of achievements">
                        <v-expansion-panel-header expand-icon="">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-img :src="'img/achievement/' + achievement.img " max-height="36px" max-width="36px"></v-img>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-badge v-if="achievement.count > 0" inline color="red darken-4" :content="achievement.count">
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
                            <v-list dense>
                                <v-list-item v-for="character of achievement.characters" link>
                                    <v-list-item-content>
                                        <v-dialog  scrollable max-width="300px">
                                            <template v-slot:activator="{ on }">
                                                <v-list-item-title v-on="on">
                                                    <v-badge inline color="red darken-4" :content="character.count">
                                                        <v-img :src="'img/class/' + character.class.toLowerCase() + '.jpg'" max-height="20px" max-width="20px" class="mr-2"></v-img>
                                                        {{ character.name }}
                                                    </v-badge>
                                                </v-list-item-title>
                                            </template>
                                            <v-card>
                                                <v-card-title class="mx-auto">
                                                    <v-img :src="'img/achievement/' + achievement.img " max-height="36px" max-width="36px" class="mr-2 mb-2 d-inline-flex"></v-img>
                                                    {{ $t(achievement.name) }}
                                                </v-card-title >
                                                <v-card-subtitle class="mx-auto">
                                                    <v-img :src="'img/class/' + character.class.toLowerCase() + '.jpg'" max-height="20px" max-width="20px" class="mr-2 mt-2 d-inline-flex"></v-img>
                                                    {{ character.name }}
                                                </v-card-subtitle>
                                                <v-card-text>
                                                    <v-list-item v-for="date of character.dates">
                                                        <v-list-item-title>
                                                            <a target="_blank" rel="noopener noreferrer" :href="settings.warcraftlogsUrl + '/reports/' + date.report" class="mx-auto"> {{ $d(date.date, 'short') }}</a>
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

<style>
    a {
        text-decoration: none;
        color: inherit;
    }

    label {
        cursor: pointer;
    }
</style>
