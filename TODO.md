# TODO

## Assets needed (drop into assets/source/)
- [ ] logos/: DFL logo, SVG or high-res PNG (light + dark background versions), icon/favicon mark
- [ ] brands/: one logo per brand, filename = brand name (e.g. domino.png). Mark which are Food, Household, Hospitality
- [ ] photos/: hero + section imagery (see shot list below)
- [ ] hospitality/: product shots for tableware, smallwares, cookware, linen, amenities

## Shot list (suggested)
- Warehouse interior, wide shot with stacked pallets (hero candidate)
- Delivery truck loaded / on a Jamaican road, branded livery visible
- Team: delivery crew, warehouse staff, sales reps, family leadership portrait
- Customer-facing: supermarket shelf stocked with DFL brands
- Hotel/restaurant kitchen or table setting using hospitality products
- Short looping video (10 to 15s, no audio): forklift/warehouse or truck departing, for hero background
- Office exterior at 71 Molynes Road (also helps the map section)
- Lifestyle flat lays of brand products on clean backgrounds

## Decisions pending (Joel)
- [ ] Social Responsibility: content or hide
- [ ] Careers: mailto vs form (no file upload)
- [ ] Form notification method (recommend Supabase webhook + edge function)
- [ ] Analytics: Hotjar only, replace, or add
- [ ] Resolve discrepancies in content/_notes.md

## Status (after page build)
Built: home, about, brands, products, hospitality, dfl-careers, contact, 404, 15 redirect stubs, sitemap.xml, robots.txt.
Not built: social-responsibility (hidden from nav until DFL supplies content; add to sitemap + nav when ready).

## Before go-live
- [ ] Apply `supabase/website_inquiries.sql`, then set SUPABASE_URL + SUPABASE_ANON_KEY at the top of `js/forms.js` (until then the contact form opens the visitor's email app)
- [ ] Choose email notification method for new enquiries (Supabase webhook/edge function recommended)
- [ ] Careers: confirm the 9 listed roles are current, and whether there is a dedicated careers email (all apply links use info@dflimporters.com)
- [ ] Contact form: confirm product-interest options (Food & Beverages / Household & Cleaning / Hospitality Supplies / Other) and industries
- [ ] Analytics: Hotjar (ID 5011608) is on the old site; decide to carry over or replace. Not added yet.
- [ ] Confirm https://catalogue.dflimporters.com is public (linked from Brands and Products)
- [ ] Hospitality: no photos for Linen (bed linens, towels) or cooking utensils; placeholders shown. Partner list (Winco, Millennia, Pujadas INOX, Elements, Biogena) is from the old site: confirm.
- [ ] Hospitality copy says "since 1976" and "over 30 years of combined expertise": reconcile
- [ ] About page keeps live-site story (1976 farm, 1995 distribution, three warehouses): confirm it's current
- [ ] About/Careers use older warehouse + office team photos from Documents/DFL Company Images: confirm OK to publish
- [ ] Rhino logo is low-res (727px); Soaka logo came from an "Unused" folder as an opaque JPG
- [ ] Canonical/OG/sitemap URLs point at https://dflimporters.com: correct for go-live, not for the github.io preview
- [ ] Jamaica parish map (SVG) not added; home uses parish chips
- [ ] Add CNAME at go-live
