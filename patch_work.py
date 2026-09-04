import re

with open('src/lib/data/work.ts', 'r') as f:
    content = f.read()

content = content.replace(
    '33kV Step-Up Switchgear',
    '33kV Distribution Substation'
)
content = content.replace(
    '{ label: "Switchgear Rating", value: "6300A / 65kA" }',
    '{ label: "Panel Distribution Rating", value: "6300A / 65kA" }'
)
content = content.replace(
    'cascaded VFD panels',
    'cascaded control panels'
)
content = content.replace(
    '{ category: "VFD Inverters", brand: "Danfoss / ABB", rating: "VLT Aqua / ACS580 110kW" }',
    '{ category: "Motor Controllers", brand: "Danfoss / ABB", rating: "110kW Control" }'
)
content = content.replace(
    'Intake Well Pumps (4x110kW VFD)',
    'Intake Well Pumps (4x110kW)'
)

with open('src/lib/data/work.ts', 'w') as f:
    f.write(content)

print("Done patching work.ts")
