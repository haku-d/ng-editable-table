import { Container, Rectangle } from "./2d.model";

// Generate a list of containers with random dimensions and quantities
export function generateContainers(numContainers: number): Container[] {
  const containers = [];
  for (let i = 0; i < numContainers; i++) {
    const id = `Container ${i + 1}`;
    const width = Math.floor(Math.random() * 100) + 50; // Random width between 50 and 150
    const height = Math.floor(Math.random() * 100) + 50; // Random height between 50 and 150
    const quantity = Math.floor(Math.random() * 3) + 1; // Random quantity between 1 and 3
    containers.push({
      id,
      width,
      height,
      quantity,
      placedRectangles: [],
      waste: width * height,
      used: false,
    });
  }
  return initializeContainers(containers);
}

// Generate a list of banners with random dimensions
export function generateBanners(numBanners: number): Rectangle[] {
  const banners = [];
  for (let i = 0; i < numBanners; i++) {
    const id = `Banner ${i + 1}`;
    const width = Math.floor(Math.random() * 40) + 10; // Random width between 10 and 50
    const height = Math.floor(Math.random() * 40) + 10; // Random height between 10 and 50
    banners.push({ id, width, height });
  }
  return banners;
}

// Initialize multiple containers with specified dimensions and quantities
export function initializeContainers(
  containersData: {
    id: string;
    width: number;
    height: number;
    quantity: number;
  }[]
): Container[] {
  return containersData.flatMap((container) =>
    Array(container.quantity)
      .fill(null)
      .map((_, index) => ({
        id: `${container.id}-${index + 1}`,
        width: container.width,
        height: container.height,
        placedRectangles: [],
        waste: container.width * container.height,
        quantity: 1,
        used: false,
      }))
  );
}

// Place banners in containers with different sizes, quantities, and availability, calculating the number of containers needed to minimize waste
export function placeBannersWithDifferentContainers(
  containers: Container[],
  banners: Rectangle[]
): Container[] {
  // Sort banners by largest dimension for better fit
  banners.sort(
    (a, b) => Math.max(b.height, b.width) - Math.max(a.height, a.width)
  );

  for (const banner of banners) {
    let bestContainer: Container | null = null;
    let bestFitPosition: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotated: boolean;
    } | null = null;
    let minimalWaste = Number.MAX_SAFE_INTEGER;

    // Iterate through all containers to find the best option with the least waste
    for (const container of containers) {
      // Skip containers that have no space left (completely filled)
      if (container.placedRectangles.length > 0 && container.waste === 0) {
        continue;
      }

      let currentBestFitPosition: {
        x: number;
        y: number;
        width: number;
        height: number;
        rotated: boolean;
      } | null = null;
      let currentMinimalWaste = Number.MAX_SAFE_INTEGER;

      // Try both orientations for each banner, preferring the one that fits better (less waste)
      const orientations = [
        { width: banner.width, height: banner.height, rotated: false },
        { width: banner.height, height: banner.width, rotated: true },
      ];

      for (const orientation of orientations) {
        // Attempt bottom-left placement in the current container
        const position = findBottomLeftPosition(
          container,
          orientation.width,
          orientation.height
        );
        if (
          position &&
          canPlaceRectangleInContainer(
            position.x,
            position.y,
            orientation.width,
            orientation.height,
            container
          )
        ) {
          // Temporarily place the banner to calculate resulting waste
          const tempPlacedBanner = {
            ...banner,
            x: position.x,
            y: position.y,
            width: orientation.width,
            height: orientation.height,
            rotated: orientation.rotated,
          };
          const tempPlacedRectangles = [
            ...container.placedRectangles,
            tempPlacedBanner,
          ];

          // Calculate waste after placing the banner
          const currentWaste = calculateContainerWaste(
            container,
            tempPlacedRectangles
          );

          // If current waste is less than minimal waste, update the best fit for this container
          if (currentWaste < currentMinimalWaste) {
            currentMinimalWaste = currentWaste;
            currentBestFitPosition = {
              x: position.x,
              y: position.y,
              width: orientation.width,
              height: orientation.height,
              rotated: orientation.rotated,
            };
          }
        }
      }

      // If this container provides a better fit than previous ones, update the overall best container and position
      if (currentBestFitPosition && currentMinimalWaste < minimalWaste) {
        minimalWaste = currentMinimalWaste;
        bestFitPosition = currentBestFitPosition;
        bestContainer = container;
      }
    }

    // If we found a suitable container, place the banner
    if (bestContainer && bestFitPosition) {
      const placedBanner = { ...banner, ...bestFitPosition };
      bestContainer.placedRectangles.push(placedBanner);
      bestContainer.waste = calculateContainerWaste(
        bestContainer,
        bestContainer.placedRectangles
      );
      bestContainer.used = true;
    } else {
      // If no suitable container was found, log that the banner could not be placed
      console.log(`Banner ${banner.id} could not be placed in any container.`);
    }
  }

  // Filter out unused containers
  return containers.filter(
    (container) => container.placedRectangles.length > 0
  );
}

// Function to calculate the total waste of a container after placing banners
function calculateContainerWaste(
  container: Container,
  placedRectangles: Rectangle[]
): number {
  const containerArea = container.width * container.height;
  const placedArea = placedRectangles.reduce((sum, rect) => {
    const rectArea = rect.rotated
      ? rect.height * rect.width
      : rect.width * rect.height;
    return sum + rectArea;
  }, 0);
  return containerArea - placedArea;
}

function canPlaceRectangleInContainer(
  x: number,
  y: number,
  width: number,
  height: number,
  container: Container
): boolean {
  // Determine actual width and height based on rotation flag of the input rectangle
  const actualWidth = width;
  const actualHeight = height;

  // Check if rectangle is within the bounds of the container
  if (
    x + actualWidth > container.width ||
    y + actualHeight > container.height
  ) {
    return false;
  }

  // Check if rectangle overlaps with any existing placed rectangles
  return !container.placedRectangles.some((placed) => {
    // Calculate placed rectangle's effective width and height based on its rotation status
    const placedWidth = placed.width;
    const placedHeight = placed.height;

    // Determine the right and bottom edges of the placed rectangle
    const placedRightEdge = placed.x! + placedWidth;
    const placedBottomEdge = placed.y! + placedHeight;

    // Determine if the current rectangle overlaps with the placed rectangle
    const isOverlapping =
      x < placedRightEdge &&
      x + actualWidth > placed.x! &&
      y < placedBottomEdge &&
      y + actualHeight > placed.y!;

    return isOverlapping;
  });
}

// Find the bottom-left-most position where a rectangle can be placed
function findBottomLeftPosition(
  container: Container,
  width: number,
  height: number
): { x: number; y: number } | null {
  let bestPosition: { x: number; y: number } | null = null;
  let minY = Number.MAX_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;

  for (let y = 0; y <= container.height - height; y++) {
    for (let x = 0; x <= container.width - width; x++) {
      if (canPlaceRectangleInContainer(x, y, width, height, container)) {
        if (y < minY || (y === minY && x < minX)) {
          minY = y;
          minX = x;
          bestPosition = { x, y };
        }
      }
    }
  }

  return bestPosition;
}
