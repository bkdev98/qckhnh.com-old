import CMS from 'netlify-cms';

CMS.registerEditorComponent({
  id: 'youtube',
  label: 'Youtube',
  fields: [{ name: 'id', label: 'Youtube Video ID', widget: 'string' }],
  pattern: /^`youtube:(\S+)$`/,
  fromBlock(match) {
    return {
      id: match[1],
    };
  },
  toBlock(obj) {
    return `\`youtube:${obj.id}\``;
  },
  toPreview(obj) {
    return (
      `<img src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" alt="Youtube Video"/>`
    );
  },
});
