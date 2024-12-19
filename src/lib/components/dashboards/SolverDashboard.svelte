<script lang="ts">
	import { goto } from "$app/navigation";
	import { updated } from "$app/state";
	import { getActiveTasks, getCompletedTasks, type ActiveTasks, type CompletedTasks, type TaskBasic } from "$lib/api";
    import { state } from "$lib/state";
    import { onMount } from "svelte";

    onMount(() => {
        if (!$state.loggedIn) {
            window.location.href = "/";
        }
    });

    let activeTasks: TaskBasic[] = [];
    let completedTasks: TaskBasic[] = [];

    async function update() {
        let a_tasks_r = await getActiveTasks();
        if (a_tasks_r.isErr()) {
            console.error(a_tasks_r.unwrapErr());
        } else {
            let a_tasks = a_tasks_r.unwrap()! as ActiveTasks;
            console.log(a_tasks);
            activeTasks = a_tasks.active_tasks!; //.filter((task) => task.team_task != null);
        }
        console.log("New active tasks");
        console.log(activeTasks);

        let c_tasks_r = await getCompletedTasks();
        if (c_tasks_r.isErr()) {
            console.error(c_tasks_r.unwrapErr());
        } else {
            let c_tasks = c_tasks_r.unwrap()! as CompletedTasks;
            completedTasks = c_tasks.completed_tasks!; //.filter((task) => task.team_task != null);
        }
        setTimeout(update, 2000);
    }

    onMount(() => {
        update();
    });

</script>

<div class="border-2 border-gray-300 text-white p-3 rounded-lg bg-transparent custom-shadow lg:w-1/2 md:w-1/2 sm:w-screen text-left">
    <h1 class="text-2xl">Active Tasks:</h1>
    <ul class="list-disc list-inside text-xl">
        {#each activeTasks as task}
            <li><b>{task.points}</b> - <a href="#" on:click={()=>{goto(`/teamtask/${task.identifier}/`)}}>{task.title}</a></li>
        {/each}
    </ul>
</div>