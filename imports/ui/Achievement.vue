<template>
    <v-expansion-panels multiple hover focusable accordion>
        <v-expansion-panel>
            <v-expansion-panel-header expand-icon="">
                <v-list>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-img :src="'/img/achievement/' + achievement.img " max-height="36px" max-width="36px"></v-img>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <v-badge v-if="achievement.count > 0" inline color="red darken-4" class="mt-0" :content="achievement.count">
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
                </v-list>
            </v-expansion-panel-header>

            <v-expansion-panel-content v-if="achievement.count > 0">
                <v-list dense>
                    <v-list-item v-for="character of achievement.characters" link>
                        <v-dialog scrollable max-width="300px">
                            <template v-slot:activator="{ on }">
                                <v-list-item-content v-on="on">
                                    <v-list-item-title v-on="on">
                                        <v-badge inline color="red darken-4" :content="character.count">
                                            <v-img :src="'/img/class/' + character.class.toLowerCase() + '.jpg'" max-height="20px" max-width="20px" class="mr-2"></v-img>
                                            {{ character.name }}
                                        </v-badge>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <AchievementForCharacter
                                :achievement="achievement"
                                :character="character"
                                :dates="character.dates"
                            />
                        </v-dialog>
                    </v-list-item>
                </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import AchievementForCharacter from "./AchievementForCharacter";

    export default {
        props: ['achievement'],
        components: {
            AchievementForCharacter
        },
    };
</script>
