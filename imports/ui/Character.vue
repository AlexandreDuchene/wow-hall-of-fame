<template>
    <v-expansion-panel>
        <v-expansion-panel-header expand-icon="">
            <v-list-item>
                <v-list-item-icon>
                    <v-img :src="'img/class/' + character.class.toLowerCase() + '.jpg'" max-height="36px" max-width="36px"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-badge v-if="character.achievementsCount > 0" inline color="red darken-4" class="mt-0" :content="character.achievementsCount">
                            {{ character.name }}
                        </v-badge>
                        <span v-else>
                            {{ character.name }}
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-expansion-panel-header>

        <v-expansion-panel-content v-if="character.achievementsCount > 0">
            <v-list dense>
                <v-list-item v-for="achievement of character.achievements" link two-line>
                    <v-dialog scrollable max-width="300px">
                            <template v-slot:activator="{ on }">
                                <v-list-item-content v-on="on">
                                    <v-list-item-title>
                                        <v-badge inline color="red darken-4" :content="achievement.count">
                                            <v-img :src="'img/achievement/' + achievement.img" max-height="20px" max-width="20px" class="mr-2"></v-img>
                                            {{ $t(achievement.name) }}
                                        </v-badge>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ $t(achievement.description) }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                            <AchievementForCharacter
                                :achievement="achievement"
                                :character="character"
                                :dates="achievement.dates"
                            />
                    </v-dialog>
                </v-list-item>
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import AchievementForCharacter from "./AchievementForCharacter";

    export default {
        props: ['character'],
        components: {
            AchievementForCharacter
        },
    };
</script>
