# William's Nebraska Nature Photography — your digital download shop

This is a ready-to-publish, mobile-friendly nature-photography download shop. It is a plain static website, so it works especially well with free **GitHub Pages** hosting.

The public site uses intentionally soft, low-resolution previews. Every preview carries the small note **“Resolution increases after buying.”** Do not upload your original full-size photographs to GitHub: it is public.

## First: make it yours

Before publishing, open these files in a plain-text editor (for example, VS Code, Notepad, or the GitHub file editor):

| What to change | Where to change it |
| --- | --- |
| Your name, bio, email, Instagram link | `index.html` |
| Your photographs, titles, places, descriptions, sizes, and prices | `photos.js` |
| The email address to receive orders | `photos.js` — change `ORDER_EMAIL` |
| The colours or layout | `style.css` |

The site currently uses illustrated placeholders in `images/`. They make the template look complete while you prepare your work; they are not real photographs and should be replaced before you launch.

## Add your photographs

1. Keep your original full-resolution photo in a private folder on your computer. Do **not** upload it to GitHub.
2. Make a low-quality preview copy for the website. Export a JPG around **700 pixels on the long edge** at **35–45% quality**. This makes the public preview noticeably softer while still looking good in the gallery.
3. Keep the original (or a separate high-resolution export) private. This is the file you send after someone pays.
4. In the `images` folder, upload the new low-quality preview file. Use a simple name with lowercase letters, numbers, and hyphens, for example: `misty-prairie.jpg`.
5. Open `photos.js`. In one photo entry, change the `image` value to the matching filename, e.g. `image: "images/misty-prairie.jpg"`.
6. Change the title, Nebraska location, category, description, and prices in that same entry. Categories available are `landscape`, `nature`, and `details`.
7. To sell another photograph, copy one complete `{ ... }` photo entry, paste it before the final `];`, update every value, and make its `id` unique. Keep a comma after each entry except the last.
8. Update the three large feature images in `index.html` too: search for `your-photo-01.svg`, `your-photo-04.svg`, and `your-photo-06.svg`, then replace each with one of your own preview filenames.

### A compact example

```js
{
  id: "misty-coast",
  title: "Misty Prairie",
  location: "Near Valentine, Nebraska",
  category: "nature",
  image: "images/misty-prairie.jpg",
  alt: "Prairie grass beneath low clouds near Valentine, Nebraska",
  description: "A soft, rain-washed morning over the grasslands.",
  sizes: [
    { label: "Full-resolution digital download", price: 3 }
  ]
}
```

## How automatic downloads will work

GitHub publishes the website, but it cannot safely take payments or hide the high-resolution files. Payhip holds each private, high-resolution file and gives it to the buyer only after payment.

For each photo, create a Payhip digital product, upload its high-resolution file there, set its price, and copy its product link. Then paste that link into the matching `payhipUrl` line in `photos.js`. A buyer clicks **Buy & download** on your website, pays on Payhip, and Payhip gives them the download automatically—no email from you needed.

Do **not** upload full-quality photos to this GitHub folder. GitHub is public, so only low-quality preview copies belong here.

The first sample photograph is connected to a Payhip product already. The other sample photographs show **Available soon** until they have their own Payhip links.

## Very easy GitHub publishing steps

1. On your computer, open the folder named `photo-storefront`. It contains this website code.
2. Go to [github.com](https://github.com), make a free account, and verify your email.
3. Click the **+** in the top-right → **New repository**.
4. Type a name such as `william-nature-photos`. Choose **Public**, then click **Create repository**.
5. Click the link that says **uploading an existing file**.
6. Open the `photo-storefront` folder again. Drag everything inside it onto GitHub: `index.html`, `style.css`, `script.js`, `photos.js`, the `images` folder, and the README. Do not drag the outer folder by itself.
7. Scroll down and click the green **Commit changes** button.
8. At the top of your repository, click **Settings** → **Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**. Set the branch to `main`, set the folder to `/(root)`, then click **Save**.
10. Wait about two minutes and refresh the same Pages screen. GitHub shows your live website address there. Open it and check the order email before sharing it.

## Very easy steps to add a photo later

1. Make a low-quality preview JPG, as described in **Add your photographs**. Keep the high-quality original on your computer, not on GitHub.
2. In your GitHub repository, open the `images` folder → **Add file** → **Upload files**. Upload the preview JPG and click **Commit changes**.
3. Go back to the main repository screen and click `photos.js` → click the pencil icon.
4. Copy one existing photo block. Paste it above the final `];`, change its title, location, filename, description, and prices, then click **Commit changes**.
5. Wait a couple of minutes, then refresh your live website. Your new photo will be there.

## Before you go live

- Replace every `william@yourdomain.com` address with your real business email.
- Replace the placeholder images with your own low-quality preview copies.
- Use photographs you own and have the right to sell.
- Add clear download, refund, and privacy policies appropriate to where you operate.
- Consider adding a custom domain later through **Settings** → **Pages**.
