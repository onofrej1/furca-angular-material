const user = {
  title: "Users",
  form: [
    { name: "name", type: "text" },
    { name: "email", type: "text" },
    {
      name: "roles",
      type: "pivotRelation",
      resourceTable: "role",
      show: "title",
      label: "Roles"
    }
  ],
  list: [{ field: "name", label: "Name" }, { field: "email", label: "Email" }]
};

const article = {
  title: "Articles",
  form: [
    { name: "title", type: "text" },
    { name: "author", type: "text" },
    { name: "content", type: "editor" },
    {
      name: "tags",
      type: "pivotRelation",
      resourceTable: "tag",
      show: "title",
      label: "Tags"
    }
  ],
  list: [
    { field: "title", label: "Title" },
    { field: "author", label: "Author" }
  ]
};

const menuItem = {
  title: "Menu",
  form: [
    { label: "Title", name: "title", type: "text" },
    {
      label: "Menu",
      name: "menu_id",
      type: "relation",
      resourceTable: "menu",
      show: "title"
    },
    {
      label: "Page",
      name: "page_id",
      type: "relation",
      resourceTable: "page",
      show: "title"
    },
    {
      label: "Parent",
      name: "parent_id",
      type: "relation",
      resourceTable: "menuItem",
      show: "title"
    },
    { label: "Link", name: "link", type: "text" }
  ],
  list: [
    { field: "title", label: "Title", render: row => `<div>${row.title}</div>` }
  ]
};

const page = {
  title: "Pages",
  form: [
    { label: "Title", name: "title", type: "text" },
    { type: "editor", label: "Body", rows: 8, name: "body" }
  ],
  list: [
    { field: "title", label: "Title", render: row => `<div>${row.title}</div>` }
  ]
};

const hamburg = {
  title: "Hamburg",
  form: [
    { label: "Title", name: "title", type: "text" },
    { label: "Date", name: "event_date", type: "date" },
    { label: "Notes", type: "text", rows: 8, name: "notes" }
  ],
  list: [
    { field: "title", label: "Title" },
    {
      label: "Date",
      field: "event_date",
      render: row => `<div>${row.event_date}</div>`
    }
  ]
};

const tag = {
  title: "Tags",
  form: [{ label: "title", name: "title", type: "text" }],
  list: [{ field: "title", label: "Title" }]
};

const models = { user, page, tag, article, menuItem, hamburg };

export default models;
