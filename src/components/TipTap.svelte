<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import Typography from '@tiptap/extension-typography';
	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
				}
			},
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: document.querySelector('.menu')
				}),
				Typography
			],
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.ies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu nec libero ultricies bibendum et ut erat. Duis vitae viverra dolor. Donec laoreet libero quis consectetur viverra. Maecenas in porttitor felis. Mauris et ipsum sollicitudin tellus auctor vehicula et vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lacus eget mauris dignissim tempus. Suspendisse potenti. Proin sed est vel felis pellentesque sollicitudin. Aliquam suscipit nunc nec aliquam vulputate. Nam diam justo, varius porta rhoncus ac, efficitur nec felis. Proin gravida massa eget pellentesque porttitor. Curabitur convallis ante eget mauris porta, non porttitor sem aliquam. Donec quis nisi eget elit pellentesque pharetra. ',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		/* editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<p>Hello World! 🌍️ </p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});*/
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	let y;
</script>

<svelte:window bind:scrollY={y} />

{#if editor}
	<div
		class="upper-menu bg-gray-200 p-2 flex mb-10 fixed rounded-none"
		style="top:{y > 100 ? 20 : y}; min-width:53%; max-width: 100%; width: calc({y * 2}px + 40%);"
	>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
			class="rounded-md p-2 mx-1"
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
			class="rounded-md p-2 mx-1"
		>
			H2
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			class:active={editor.isActive('heading', { level: 3 })}
			class="rounded-md p-2 mx-1"
		>
			H3
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
			class:active={editor.isActive('heading', { level: 4 })}
			class="rounded-md p-2 mx-1"
		>
			H4
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
			class="rounded-md p-2 mx-1"
		>
			<span class="material-icons"> notes </span>
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			class:active={editor.isActive('bulletList')}
			class="rounded-md p-2 mx-1"
		>
			<span class="material-icons"> format_list_bulleted </span>
		</button>
		<button
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
			class:active={editor.isActive('orderedList')}
			class="rounded-md p-2 mx-1"
		>
			<span class="material-icons"> format_list_numbered </span>
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class:active={editor.isActive('blockquote')}
			class="rounded-md p-2 mx-1"
		>
			<span class="material-icons"> format_quote </span>
		</button>
		<button
			on:click={() => editor.chain().focus().setHorizontalRule().run()}
			class="rounded-md p-2 mx-1"
		>
			—
		</button>
		<div class="flex-grow" />
		<button on:click={() => editor.chain().focus().undo().run()} class="rounded-md p-2 mx-1">
			<span class="material-icons"> undo </span>
		</button>
		<button on:click={() => editor.chain().focus().redo().run()} class="rounded-md p-1 mx-1">
			<span class="material-icons"> redo </span>
		</button>
	</div>
{/if}
<div class="full-width absolute">
	{#if editor}
		<div class="upper-menu bg-gray-200 rounded-md p-2 md:flex">
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={editor.isActive('heading', { level: 1 })}
				class="rounded-md p-2 mx-1"
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
				class="rounded-md p-2 mx-1"
			>
				H2
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class:active={editor.isActive('heading', { level: 3 })}
				class="rounded-md p-2 mx-1"
			>
				H3
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class:active={editor.isActive('heading', { level: 4 })}
				class="rounded-md p-2 mx-1"
			>
				H4
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class:active={editor.isActive('paragraph')}
				class="rounded-md p-2 mx-1"
			>
				<span class="material-icons"> notes </span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
				class="rounded-md p-2 mx-1"
			>
				<span class="material-icons"> format_list_bulleted </span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
				class="rounded-md p-2 mx-1"
			>
				<span class="material-icons"> format_list_numbered </span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class:active={editor.isActive('blockquote')}
				class="rounded-md p-2 mx-1"
			>
				<span class="material-icons"> format_quote </span>
			</button>
			<button
				on:click={() => editor.chain().focus().setHorizontalRule().run()}
				class="rounded-md p-2 mx-1"
			>
				—
			</button>
			<div class="flex-grow" />
			<button on:click={() => editor.chain().focus().undo().run()} class="rounded-md p-2 mx-1">
				<span class="material-icons"> undo </span>
			</button>
			<button on:click={() => editor.chain().focus().redo().run()} class="rounded-md p-1 mx-1">
				<span class="material-icons"> redo </span>
			</button>
		</div>
	{/if}
	<div
		bind:this={element}
		class="editor shadow-2xl rounded-md editor border-2 border-gray-200 mt-2"
	/>
</div>

<!-- Bubble Menu -->
<div class="menu bg-black rounded-md p-2">
	<button
		on:click={() => editor.chain().focus().toggleBold().run()}
		class="text-white p-1 hover:bg-white hover:bg-opacity-20 duration-500 rounded-md"
		><span class="material-icons"> format_bold </span></button
	>
	<button
		on:click={() => editor.chain().focus().toggleItalic().run()}
		class="text-white p-1 hover:bg-white hover:bg-opacity-20 duration-500 rounded-md"
		><span class="material-icons"> format_italic </span></button
	>
	<button
		on:click={() => editor.chain().focus().toggleStrike().run()}
		class="text-white p-1 hover:bg-white hover:bg-opacity-20 duration-500 rounded-md"
		><span class="material-icons"> format_strikethrough </span></button
	>
</div>

<style>
	button.active {
		color: white;
		background: black;
	}
	.editor {
		min-width: 100%;
		overflow: hidden;
	}

	button {
		vertical-align: middle;
	}
	.material-icons {
		vertical-align: middle;
	}

	.upper-menu {
		z-index: 39;
	}
</style>
